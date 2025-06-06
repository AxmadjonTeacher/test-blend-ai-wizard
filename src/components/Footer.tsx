
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <footer className="bg-accent text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={columnVariants}>
            <div className="flex items-center gap-2 mb-4">
              <motion.div 
                className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-accent font-bold text-lg">T</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-white">Testy</h3>
            </div>
            <p className="text-sm text-white/80">
              AI-powered test generator for English language teachers.
              Create unique tests efficiently and save valuable time.
            </p>
          </motion.div>
          
          <motion.div variants={columnVariants}>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/" className="text-white/80 hover:text-white">Home</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/dashboard" className="text-white/80 hover:text-white">Dashboard</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/generate" className="text-white/80 hover:text-white">Generate</Link>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div variants={columnVariants}>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/privacy-policy#data-retention" className="text-white/80 hover:text-white">Help Center</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/privacy-policy#contact" className="text-white/80 hover:text-white">Contact Us</Link>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} Testy. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
