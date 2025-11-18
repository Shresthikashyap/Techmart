// 'use client';

// import { useEffect } from 'react';
// import useSWR from 'swr';
// import axios from 'axios';
// import { useProductStore } from '@/store/useProductStore';
// import { Product } from '@/types/types';

// const fetcher = (url: string) => axios(url).then(res => res.data);

// const FetchProducts = () => {
//   const { setProducts } = useProductStore();

//   // Use SWR to fetch data
//   const { data, error } = useSWR<Product>(
//     'https://wordpress-1317621-5009079.cloudwaysapps.com/wp-json/wc/v3/products/2343?consumer_key=ck_8fc0f6232682e8990f6d21120acd1289136e6c86&consumer_secret=cs_1c7df267cb08426d3cd6433ad358f8440da5a6f6',
//     fetcher
//   );

//   // Update Zustand store and handle errors in one useEffect
//   useEffect(() => {
//     try {
//       if (data) {
//         setProducts(data);
//       }
//       if (error) {
//         console.error('Error fetching products:', error);
//       }
//     } catch (err) {
//       console.error('Error handling data or error:', err);
//     }
//   }, [data, error, setProducts]);

//   return null; // No UI rendering
// };

// export default FetchProducts;

"use client";

import axios from "axios";
import { useEffect } from "react";

export default function FetchProducts(){


  useEffect(()=>{
    const fetchProduct = async() => {
      const response = await axios.get(
        'https://wordpress-1317621-5009079.cloudwaysapps.com/wp-json/wc/v3/products/2343?consumer_key=ck_8fc0f6232682e8990f6d21120acd1289136e6c86&consumer_secret=cs_1c7df267cb08426d3cd6433ad358f8440da5a6f6'
        )

      console.log(response.data)
    }

    fetchProduct();
  })

  return null;
}