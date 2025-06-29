
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 ml-2">
      <motion.img 
        src="/lovable-uploads/ab37d4e6-f77b-4401-b3ca-6252db1fd68b.png" 
        alt="Testy Logo" 
        className="h-10 w-10"
        whileHover={{ rotate: 10, scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
      <motion.h1 
        className="text-2xl font-bold text-neutral-dark"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Testy
      </motion.h1>
    </Link>
  );
};

export default HeaderLogo;
