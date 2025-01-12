import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*', // Replace '*' with your frontend domain
  allowedHeaders: ['Content-Type'],
});

// Helper function to run the middleware
export default function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const applyCors = async (req, res) => {
  await runMiddleware(req, res, cors);
};
