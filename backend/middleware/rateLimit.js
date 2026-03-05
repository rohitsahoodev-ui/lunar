const rateLimit = (limit, windowMs) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }
    
    const timestamps = requests.get(ip).filter(ts => now - ts < windowMs);
    timestamps.push(now);
    requests.set(ip, timestamps);
    
    if (timestamps.length > limit) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    
    next();
  };
};

export default rateLimit;
