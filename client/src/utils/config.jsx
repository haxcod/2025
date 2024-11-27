import { useEffect } from "react";

const config = {
    development: 'http://localhost:3000',
    production: 'https://xempire-1w0axqpt.b4a.run',
  };
  
  const ApiUri = config[process.env.NODE_ENV];
  
  export default ApiUri;
  