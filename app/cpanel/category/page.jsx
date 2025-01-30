"use client"; 
import { useEffect } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';

const searchClient = algoliasearch('G7NL75DG1D', '5860c31f24fe6ecf2f3c1fa2c2349de3');

export default function SearchPage() {


  useEffect(() => {
    const search = instantsearch({
      indexName: 'Product_index',
      searchClient,
    });

    search.addWidgets([
      searchBox({
        container: '#searchbox',
        placeholder: 'Search for products...',
      }),
      hits({
        container: '#hits',
        templates: {
          item: `
            <div class=" product-card border rounded-lg shadow-lg">

            <div class="product-image-container">
            <img class="product-image" src="{{#helpers.highlight}}{ "attribute": "images.0.defaultImage" }{{/helpers.highlight}}" alt="Product Image" class="w-40 h-40 object-cover mr-4"/>
            <img class="product-hover-image" src="{{#helpers.highlight}}{ "attribute": "images.1.hoverImage" }{{/helpers.highlight}}" alt="Product Image" class="w-40 h-40 object-cover mr-4"/>
             </div>
                <div class="p-4">
                <h2 class="product-title">{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
                  <span class="title-underline"></span>
                </h2>

               <div class="flex justify-between my-4">
                    <p className="text-gray-600">₹{{#helpers.highlight}}{ "attribute": "price" }{{/helpers.highlight}}</p>
                    <img src="/images/wishlist-icon.svg" alt="Product Image" class="wishlist object-cover mr-4"/>
                </div 
              </div>
            </div>
          `,
        },
      }),
    ]);

    search.start();

    // Cleanup function
    return () => search.dispose();
  }, []);

  return (
     <>
     
     <h1 className="text-3xl font-bold mb-6">Search Page</h1>
      <div id="searchbox" className="mb-6"></div>
      <div id="hits"></div>
     </>

  );
}
