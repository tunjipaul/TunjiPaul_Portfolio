import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Seo from "../seo/Seo";
import { PAGES } from "../seo/site";

function NotFound() {
  return (
    <div className="w-full min-h-screen bg-orange-50 flex flex-col">
      <Seo
        title={PAGES.notFound.title}
        description={PAGES.notFound.description}
        path={PAGES.notFound.path}
        noindex
      />
      <NavBar />
      <main
        id="main-content"
        className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center"
      >
        <p className="text-orange-600 font-semibold mb-2">404</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page not found
        </h1>
        <p className="text-gray-700 max-w-md mb-8">
          That URL does not exist. Head back to the portfolio to view projects,
          skills, and contact details.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500 min-h-11 inline-flex items-center"
          >
            Go home
          </Link>
          <Link
            to="/projects"
            className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-100 min-h-11 inline-flex items-center"
          >
            View projects
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
