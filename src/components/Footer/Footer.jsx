import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-blueGray-500 pt-8 pb-6 w-full my-14 max-w-5xl">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap text-left lg:text-left">
        <div className="w-full lg:w-6/12 px-4 inline-block">
          <h4 className="text-3xl font-semibold text-blueGray-700">¡Sigamos en contacto!</h4>
          <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
            Encuentranos en  estas plataformas, respondemos en el día.
          </h5>
          <div className="flex bg-red flex-row flex-wrap-reverse justify-center mt-8 ">
        <div className="flex flex-col justify-center  w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 dark:bg-gray-100 dark:text-gray-800">
           
            
            <div className="flex items-center justify-center p-3 space-x-3 border-t-2">
             
            
              <a
                rel="noopener noreferrer"
                href="https://www.instagram.com/santeria_rincondeluz/?igshid=MzRlODBiNWFlZA%3D%3D"
                title="Instagram"
                className="dark:text-gray-900 hover:dark:text-violet-400"
              >
                
                <img src="https://w7.pngwing.com/pngs/477/609/png-transparent-logo-computer-icons-instagram-logo-instagram-logo-miscellaneous-text-trademark.png" alt="Logo" className="w-6 h-6" />
              </a>
              <a
                rel="noopener noreferrer"
                href="https://www.facebook.com/profile.php?id=100090125044453&mibextid=9R9pXO"
                title="Facebook"
                className="dark:text-gray-900 hover:dark:text-violet-400"
              >
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png" alt="Logo" className="w-6 h-6" />
              </a>
             
                
             
            </div>
          </div>
          
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;