import express from "express";
import cors from 'cors';
import 'dotenv/config';
import ServerlessHttp from "serverless-http";

const ITEMS_KEY = "items";
const BAZAAR_URL = "https://www.stardoll.com/en/com/user/getStarBazaar.php";
const FASHION_SEARCH_URL_PART = "?search&type=fashion&Price=24";
const INTERIOR_SEARCH_URL_PART = "?search&type=interior&Price=24";
const MAX_ITEMS_AT_ONCE = 20;

async function fetchData(url, html = false) {
  try {
    const response = await fetch(url, {
      withCredentials: true,
      headers: {
        Cookie: "pdhUser=" + process.env.PDH_USER + ";"
      }
    });
    const data = html ? response.text() : response.json();
    return data;
  } catch (e) {
    console.error("Could not get response:", e);
  }
}

const search = async (req) => {

  const itemType = req.query.itemType;

  let searchUrl = BAZAAR_URL;

  if (itemType === "fashion" || !itemType) {
    searchUrl += FASHION_SEARCH_URL_PART;
  } else if (itemType === "interior") {
    searchUrl += INTERIOR_SEARCH_URL_PART;
  }

  let itemName = req.query.itemName ? req.query.itemName.toLowerCase() : "";

  let brandId = req.query.brandId;
  searchUrl += brandId ? `&brands=${brandId}` : "";

  let minPrice = req.query.minPrice;
  searchUrl += minPrice ? `&minPrice=${minPrice}` : "";

  let maxPrice = req.query.maxPrice;
  searchUrl += maxPrice ? `&maxPrice=${maxPrice}` : "";

  let currencyType = req.query.currencyType;
  searchUrl += (minPrice || maxPrice) && currencyType ? `&currencyType=${currencyType}` : "";

  let excludeBrands = req.query.excludedBrands || [];

  let categories = [];
  let colourId = req.query.colourId;
  if (colourId) {
    categories.push(colourId);
  }
  let itemCategoryId = req.query.itemCategoryId;
  if (itemCategoryId) {
    categories.push(itemCategoryId);
  }
  if (categories.length === 1) {
    searchUrl += `&categories=${categories[0]}`;
  } else if (categories.length > 1) {
    searchUrl += `&categories=${categories.join(",")}`;
  }

  let items = [];
  let itemIds = [];
  let stopSearchTime = Date.now() + 8000;

  while (Date.now() < stopSearchTime && items.length < MAX_ITEMS_AT_ONCE) {
    let returnedPage = await fetchData(searchUrl);

    // if there are no items on the page then get a new page
    if (returnedPage != null && ITEMS_KEY in returnedPage) {
      let returnedItems = returnedPage[ITEMS_KEY];

      for (let item of returnedItems) {
        let itemId = item['itemId'];
        let addItem = false;

        if (excludeBrands.includes(item.brand)) {
          continue;
        }

        if (itemName !== "") {
          let searchedItemName = item.name.toLowerCase();
          if (searchedItemName.includes(itemName)) {
            addItem = true;
          }
        } else {
          if (!itemIds.includes(itemId)) {
            addItem = true;
            itemIds.push(itemId);
          }
        }

        if (addItem) {
          items.push(item);
        }

        if (items.length >= MAX_ITEMS_AT_ONCE) {
          break;
        }
      }
    }
  }

  return { "items": items };
}

const app = express();
app.use(cors())

app.get("/.netlify/functions/search", async (req, res) => {
  search(req)
    .then(data => {
      res.json(data);
    });
});

const handler = ServerlessHttp(app);
module.exports.handler = async (event, context) => {
  const result = handler(event, context);
  return result;
}
