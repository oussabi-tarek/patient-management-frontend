
const Footer=()=>{
 return(
        <footer id="footer" className="relative bottom-0 w-full mr-5  bg-white rounded-lg shadow  dark:bg-gray-800 ">
            <div className="p-3 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">Santé Connectée™</a>. Tous droits réservés.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">À propos</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">politique de confidentialité</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licence</a>
                </li>
            </ul>
            </div>
        </footer>
 )
}
export default Footer;