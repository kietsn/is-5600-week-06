import React, { useEffect, useState } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';

const LIMIT = 10;

const CardList = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data);
  const [products, setProducts] = useState(data.slice(0, LIMIT));

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + LIMIT));
  }, [offset, filteredData]);

  const filterTags = (valueOrEvent) => {
    const rawValue =
      typeof valueOrEvent === 'string'
        ? valueOrEvent
        : valueOrEvent?.target?.value || '';

    const searchTerm = rawValue.trim().toLowerCase();

    const nextFilteredData =
      searchTerm === ''
        ? data
        : data.filter((product) =>
            Array.isArray(product.tags) &&
            product.tags.some((tag) =>
              String(tag).toLowerCase().includes(searchTerm)
            )
          );

    setOffset(0);
    setFilteredData(nextFilteredData);
    setProducts(nextFilteredData.slice(0, LIMIT));
  };

  const handlePageChange = (direction) => {
    const nextOffset = offset + direction;

    if (nextOffset < 0) return;
    if (nextOffset >= filteredData.length) return;

    setOffset(nextOffset);
  };

  const isPreviousDisabled = offset === 0;
  const isNextDisabled = offset + LIMIT >= filteredData.length;

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} {...product} />
          ))
        ) : (
          <p className="tc f4 gray">No products found.</p>
        )}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePageChange(-LIMIT)}
          disabled={isPreviousDisabled}
        />
        <Button
          text="Next"
          handleClick={() => handlePageChange(LIMIT)}
          disabled={isNextDisabled}
        />
      </div>
    </div>
  );
};

export default CardList;