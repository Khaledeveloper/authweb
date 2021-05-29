module.exports = {
    googleOAuth: async (req, res, next) => {
        
        res.status(200).json({ success: true });
      },
    
      linkGoogle: async (req, res, next) => {
        res.json({ 
          success: true,
          methods: req.user.methods, 
          message: 'Successfully linked account with Google' 
        });
      },
      
      facebookOAuth: async (req, res, next) => {
        
        res.status(200).json({ success: true });
      },
    
      linkFacebook: async (req, res, next) => {
        res.json({ 
          success: true,
          methods: req.user.methods, 
          message: 'Successfully linked account with Facebook' 
        });
      },
      
      
      
      
      
   

}