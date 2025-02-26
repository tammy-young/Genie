import { onEnterSearch, getFilters } from "../../searchUtils.js";
import { useState, useEffect } from "react";

import NameSelector from './itemNameFilter.js';
import BrandSelector from './brandFilter.js';
import PriceSelector from './priceFilter.js';
import ExcludeBrandSelector from './excludeBrandFilter.js';

import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import ColourFilter from "./colourFilter.js";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const Filters = ({ setIsSearching, searchedItems, setSearchedItems }) => {
  const [brandsToId, setBrandsToId] = useState([]);
  const [coloursToId, setColoursToId] = useState([]);
  const itemType = window.location.pathname.split('/')[1] || "fashion";

  const [selectedBrand, setSelectedBrand] = useState({});
  const [excludedBrands, setExcludedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([2, 600]);
  const [currencyType, setCurrencyType] = useState('');
  const [itemName, setItemName] = useState('');
  const [selectedColour, setSelectedColour] = useState({});

  useEffect(() => {
    if (brandsToId.length === 0) {
      getFilters(setBrandsToId, setColoursToId);
    }
    // eslint-disable-next-line
  }, []);

  function clearFilters() {
    setSelectedBrand({});
    setExcludedBrands([]);
    setPriceRange([2, 600]);
    setCurrencyType('');
    setItemName('');
    setSelectedColour({});
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 1280;
      setIsSmallScreen(isSmall);

      if (!isSmall) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isSmallScreen ? (
        <div className="!block w-full">
          <div className="flex space-x-2">
            <Button onClick={handleOpen} className="border !text-black dark:!text-white !normal-case">
              Filters
            </Button>
            <Button
              onClick={(e) =>
                onEnterSearch(
                  e,
                  { selectedBrand, excludedBrands, selectedColour, priceRange, currencyType, itemName },
                  itemType,
                  setIsSearching,
                  searchedItems,
                  setSearchedItems,
                )
              }
              className={`${itemType} !text-white !normal-case`}
            >
              Search
            </Button>
          </div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style} className="dark:!bg-[#1f2023] dark:!text-white p-4 md:w-1/2 lg:w-1/3 w-5/6 !rounded-lg">
              <form
                onSubmit={(e) =>
                  onEnterSearch(
                    e,
                    { selectedBrand, excludedBrands, selectedColour, priceRange, currencyType, itemName },
                    itemType,
                    setIsSearching,
                    searchedItems,
                    setSearchedItems,
                    handleClose
                  )
                }
                id="filter-form"
                className="flex flex-col space-y-4 w-full flex-wrap ml-0"
              >
                <div className="flex justify-between items-center">
                  <h1 className="font-bold mb-0">Filters</h1>
                  <CloseIcon onClick={handleClose} className="cursor-pointer" />
                </div>
                <hr className="dark:border-neutral-500" />
                <BrandSelector
                  brandsToId={brandsToId}
                  setSelectedBrand={setSelectedBrand}
                  selectedBrand={selectedBrand}
                />
                <ExcludeBrandSelector
                  brandsToId={brandsToId}
                  setExcludedBrands={setExcludedBrands}
                  excludedBrands={excludedBrands}
                />
                <ColourFilter
                  coloursToId={coloursToId}
                  setSelectedColour={setSelectedColour}
                  selectedColour={selectedColour}
                />
                <PriceSelector
                  setPriceRange={setPriceRange}
                  setCurrencyType={setCurrencyType}
                  priceRange={priceRange}
                  currencyType={currencyType}
                />
                <NameSelector setItemName={setItemName} itemName={itemName} />
                <div className="flex space-x-2 ml-0">
                  <Button className={`btn ${itemType} !h-fit !normal-case`} type="submit">
                    Search
                  </Button>
                  <Button className="!bg-neutral-500 !text-white !normal-case" type="button" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      ) : (
        <form className="flex w-full flex-wrap !flex-row space-x-4"
          onSubmit={(e) =>
            onEnterSearch(
              e,
              { selectedBrand, excludedBrands, selectedColour, priceRange, currencyType, itemName },
              itemType,
              setIsSearching,
              searchedItems,
              setSearchedItems,
              handleClose
            )
          }>
          <div className='2xl:!max-w-[17%] 2xl:!w-1/6'>
            <BrandSelector
              brandsToId={brandsToId}
              setSelectedBrand={setSelectedBrand}
              selectedBrand={selectedBrand}
            />
          </div>

          <div className='2xl:!max-w-[17%] 2xl:!w-1/6'>
            <ExcludeBrandSelector
              brandsToId={brandsToId}
              setExcludedBrands={setExcludedBrands}
              excludedBrands={excludedBrands}
            />
          </div>

          <div className='2xl:!max-w-[17%] 2xl:!w-1/6'>
            <ColourFilter
              coloursToId={coloursToId}
              setSelectedColour={setSelectedColour}
              selectedColour={selectedColour}
            />
          </div>

          <PriceSelector
            setPriceRange={setPriceRange}
            setCurrencyType={setCurrencyType}
            priceRange={priceRange}
            currencyType={currencyType}
          />

          <div className="2xl:!max-w-[17%] 2xl:!w-1/6 pr-8">
            <NameSelector setItemName={setItemName} itemName={itemName} />
          </div>

          <div className="flex space-x-2 lg:mt-[1.6rem] w-fit ml-0">
            <Button className={`btn ${itemType} !h-fit !normal-case`} type="submit">
              Search
            </Button>
            <Button className="!bg-neutral-500 !h-fit !text-white !normal-case" type="button" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Filters;
