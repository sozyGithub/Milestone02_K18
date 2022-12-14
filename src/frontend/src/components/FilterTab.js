import { Chip } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PlaceContext from "../context/PlaceContext";
import qs from "query-string";

const priceRange = [
  {
    value: 0,
    label: "0 - 10K",
  },
  {
    value: 10000,
    label: "10K - 20K",
  },
  {
    value: 20000,
    label: "20K - 30K",
  },
  {
    value: 30000,
    label: "30K - 40K",
  },
  {
    value: 40000,
    label: "40K - 50K",
  },
  {
    value: 50000,
    label: "> 50K",
  },
];

function FilterTab({ searchValue, sortData, sortStatus }) {
  const { categories, paymentMethods, platforms } = useContext(PlaceContext);
  const [categoriesValue, setCategoriesValue] = useState([]);
  const [platformsValue, setPlatformsValue] = useState([]);
  const [paymentMethodsValue, setPaymentMethodsValue] = useState([]);
  const [priceRangeValue, setPriceRangeValue] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMinPrice(priceRangeValue);
    if (parseInt(priceRangeValue) !== 50000) {
      setMaxPrice(parseInt(priceRangeValue) + 10000);
    } else {
      setMaxPrice(999999);
    }
  }, [priceRangeValue]);

  function handleSubmit() {
    let pathname = location.pathname;
    if (!pathname.includes("result")) {
      pathname = `${location.pathname}/result`;
    }
    const queryParam = qs.parse(searchValue && `?search=${searchValue}`);
    const newQueryParam = {
      ...queryParam,
      sort_data: sortData ? sortData : "rating",
      sort_status: sortStatus ? sortStatus : "desc",
      filter_category: categoriesValue.join(";"),
      filter_price: `${minPrice ? minPrice : 0};${
        maxPrice ? maxPrice : 999999
      }`,
      filter_platform: platformsValue.join(";"),
      filter_payment: paymentMethodsValue.join(";"),
    };

    navigate({
      pathname: pathname,
      search: qs.stringify(newQueryParam),
    });
  }

  return (
    <div className="w-[70vw] my-6 bg-greyscale px-8 py-6 rounded-2xl space-y-8 sm:text-lg text-sm">
      <div>
        <label className="font-semibold sm:text-xl text-lg">Kategori</label>
        <Chip.Group
          value={categoriesValue}
          onChange={setCategoriesValue}
          position="left"
          multiple
          mt={15}
        >
          {categories.length !== 0 &&
            categories.map((category) => {
              return (
                <ul key={category.id}>
                  <Chip value={category.name}>{category.name}</Chip>
                </ul>
              );
            })}
        </Chip.Group>
      </div>

      <div>
        <label className="font-semibold sm:text-xl text-lg">
          Cara Pembayaran
        </label>
        <Chip.Group
          value={paymentMethodsValue}
          onChange={setPaymentMethodsValue}
          position="left"
          multiple
          mt={15}
        >
          {paymentMethods.length !== 0 &&
            paymentMethods.map((method) => {
              return (
                <ul key={method.id}>
                  <Chip value={method.name}>{method.name}</Chip>
                </ul>
              );
            })}
        </Chip.Group>
      </div>

      <div>
        <label className="font-semibold sm:text-xl text-lg">Harga</label>
        <Chip.Group
          multiple={false}
          value={priceRangeValue}
          onChange={setPriceRangeValue}
          mt={15}
        >
          {priceRange.map((price) => {
            return (
              <ul key={price.value}>
                <Chip value={price.value.toString()}>{price.label}</Chip>
              </ul>
            );
          })}
        </Chip.Group>
      </div>

      <div>
        <label className="font-semibold sm:text-xl text-lg">Platform</label>
        <Chip.Group
          value={platformsValue}
          onChange={setPlatformsValue}
          position="left"
          multiple
          mt={15}
        >
          {platforms.length !== 0 &&
            platforms.map((platform) => {
              return (
                <ul key={platform.id}>
                  <Chip value={platform.name}>{platform.name}</Chip>
                </ul>
              );
            })}
        </Chip.Group>
      </div>

      <div className="flex justify-end w-full">
        <button onClick={handleSubmit} className="btn-primary items-end">
          Terapkan Filter
        </button>
      </div>
    </div>
  );
}

export default FilterTab;
