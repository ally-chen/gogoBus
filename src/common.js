import React from 'react';
import axios from 'axios';
import jsSHA from "jssha";
import { auth } from "@/const";

const checkIsMobile = () => {
  if (typeof window === 'undefined') {
    return true;
  }
  return window.innerWidth < 768;
};

export const useIsMobile = () => {
  // Initialize the desktop size to an accurate value on initial state set
  const [isMobileSize, setIsMobileSize] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const autoResize = () => {
      setIsMobileSize(checkIsMobile());
    }

    window.addEventListener('resize', autoResize);

    autoResize();

    // Return a function to disconnect the event listener
    return () => window.removeEventListener('resize', autoResize);
  }, [])

  return isMobileSize;
};

export const useIsMobileEnv = () => {
  const [isMobileEnv, setIsMobileEnv] = React.useState(false);

  React.useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobileEnv(true);
    }
  }, [])

  return isMobileEnv;
};

const genHMAC = () => {
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(auth.key, 'TEXT');
  ShaObj.update(`x-date: ${GMTString}`);
  const HMAC = ShaObj.getHMAC('B64');
  return { HMAC, GMTString };
};

export const useAxios = async ({
  method = 'get',
  url,
  ...others
}) => {
  const { HMAC, GMTString } = genHMAC();
  let responseData = null;
  try {
    const { data } = await axios({
      method,
      url,
      responseType: 'json',
      headers: {
        Authorization: `hmac username="${auth.id}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`,
        'x-date': GMTString,
      },
      ...others
    });
    responseData = data;
  } catch (err) {
    console.log('api error: ', err);
  }
  return responseData;
};