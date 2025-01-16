import algoliasearch from 'algoliasearch';

const client = algoliasearch('G7NL75DG1D', '4660e8ebd7d7b7ed21fda1d603191d65');

// Fetch and index objects in Algolia
export const processRecords = async () => {
  try {
    const datasetRequest = await fetch('/api/product');
    const product = await datasetRequest.json();
    await client.initIndex('product_index').saveObjects(product);
    console.log('Successfully indexed objects!');
  } catch (err) {
    console.error('Error indexing objects:', err);
  }
};
