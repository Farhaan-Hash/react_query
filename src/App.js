import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import RQUsers from "./components/RQUsers";
import Users from "./components/Users";
import RQUserDetail from "./components/RQUserDetail";
import {DynamicQueries} from "./components/DynamicQueries";
import DependentQueries from "./components/DependentQueries";
import {PaginatedQueries} from "./components/PaginatedQueries";
import {InfiniteQueries} from "./components/InfiniteQueries";

// Create Instance of Query-Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">Users in The Company(useEffect)</Link>
              </li>
              <li>
                <Link to="/rqusers">RQ Users in The Company (useQuery)</Link>
              </li>
              <li>
                <Link to="/rq-dynamic">Dynamic Queries</Link>
              </li>
              <li>
                <Link to="/rq-dependent">Dependent Queries</Link>
              </li>
              <li>
                <Link to="/rq-paginated">Paginated Queries</Link>
              </li>
              <li>
                <Link to="/rq-infinite">Infinite Queries</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/rqusers" element={<RQUsers />} />
            <Route path="/rqusers/:userId" element={<RQUserDetail />} />
            <Route path="/rq-dynamic" element={<DynamicQueries />} />
            <Route path="/rq-dependent" element={<DependentQueries />} />
            <Route path="/rq-paginated" element={<PaginatedQueries />} />
            <Route path="/rq-infinite" element={<InfiniteQueries />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
