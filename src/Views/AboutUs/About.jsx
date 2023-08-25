const About = () => {
  return (
    <section className="py-6 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center p-0 mx-auto sm:p-10">
        <p className="p-2 text-sm font-medium tracki text-center uppercase">
          Datos de contacto
        </p>
        <h1 className="text-4xl mt-5 mb-10 font-bold leadi text-center sm:text-5xl">
         ¡Contactate con nosotros!
        </h1>
        <div className="flex bg-red flex-row flex-wrap-reverse justify-center mt-8 ">
        <div className="flex flex-col justify-center  w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 dark:bg-gray-100 dark:text-gray-800">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-gray-500"
              src="https://res.cloudinary.com/dyeknjnsi/image/upload/v1692923479/Rincon%20de%20luz/WhatsApp_Image_2023-08-24_at_21.30.19_seliil.jpg"
            />
            <div className="flex-1  my-4">
              <p className="text-xl font-semibold leadi">Silvia Gandino</p>
              <p>Contacto</p>
            </div>
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
    </section>
  );
};

export default About;