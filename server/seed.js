const mongoose = require('mongoose');
require('dotenv').config();
const Service = require('./models/Service');

const services = [
  {
    title: 'Business Website',
    category: 'Website Design & Development',
    description: 'A professional multi-page website tailored to your business needs. Includes responsive design, contact forms, and SEO basics.',
    duration: '4–6 weeks',
    startingPrice: 1500,
    features: ['Up to 8 pages', 'Mobile responsive', 'Contact form', 'Basic SEO', 'CMS integration']
  },
  {
    title: 'Mobile App Development',
    category: 'Mobile App Development',
    description: 'Custom iOS and Android mobile application built with React Native. Includes UI design, API integration, and app store submission.',
    duration: '8–16 weeks',
    startingPrice: 5000,
    features: ['iOS & Android', 'Custom UI/UX', 'API integration', 'Push notifications', 'App store submission']
  },
  {
    title: 'E-Commerce Store',
    category: 'E-Commerce Store',
    description: 'Full-featured online store with product management, cart, checkout, and payment gateway integration.',
    duration: '6–10 weeks',
    startingPrice: 3000,
    features: ['Product catalog', 'Shopping cart', 'Payment gateway', 'Order management', 'Inventory tracking']
  },
  {
    title: 'Landing Page',
    category: 'Landing Page',
    description: 'High-converting single-page website designed to capture leads or promote a product or service.',
    duration: '1–2 weeks',
    startingPrice: 500,
    features: ['Single page', 'Lead capture form', 'Mobile responsive', 'Fast load speed', 'Analytics setup']
  },
  {
    title: 'Website Redesign & Maintenance',
    category: 'Website Redesign & Maintenance',
    description: 'Modernise your existing website with a fresh design and ongoing maintenance to keep it running smoothly.',
    duration: '3–5 weeks',
    startingPrice: 1000,
    features: ['Full redesign', 'Performance optimisation', 'Security updates', 'Monthly maintenance', 'Content updates']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Service.deleteMany();
    await Service.insertMany(services);
    console.log('Services seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();