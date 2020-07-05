import React, { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const PriceFilter = ({ priceRange, handlePriceChange }) => {
  const [price, setPrice] = useState(priceRange);

  return (
    <form className="form priceFilter">
      <h5>Refine flight search</h5>
      <InputRange
        formatLabel={value => `${value} Rs`}
        step={1000}
        maxValue={50000}
        minValue={0}
        onChange={value => setPrice(value)}
        onChangeComplete={value => handlePriceChange(value)}
        value={price}
      />
    </form>
  );
};

export default PriceFilter;
