import {
  Authenticated,
  GitHubBanner,
  Refine,
  WelcomePage,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { authProvider } from "./providers/auth";
import {
  Home,
  Login,
  ForgotPassword,
  Register,
  CompanyListPage,
} from "./pages/index";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/company/create";
import Edit from "./pages/company/edit";
import EditPage from "./pages/company/edit";
import List from "./pages/tasks/list";
import EditTask from "./pages/tasks/edit";
import TasksCreatePage from "./pages/tasks/create";

// import { ColorModeContextProvider } from "./contexts/color-mode";

// const API_URL = "https://api.nestjs-query.refine.dev/graphql";
// const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

// const gqlClient = new GraphQLClient(API_URL);
// const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        {/* <ColorModeContextProvider> */}
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "vnXL1n-Bm0n9k-WyLKfr",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route index path="/register" element={<Register />} />
                <Route index path="/login" element={<Login />} />
                <Route
                  index
                  path="/forgotPassword"
                  element={<ForgotPassword />}
                />

                <Route
                  element={
                    <Authenticated
                      key={"authenticated-layout"}
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="/companies">
                    <Route index element={<CompanyListPage />} />
                    <Route path="new" element={<Create />} />
                    <Route path="edit/:id" element={<EditPage />} />
                  </Route>
                  <Route
                    path="/tasks"
                    element={
                      <List>
                        <Outlet />
                      </List>
                    }>
                    <Route path="new" element={<TasksCreatePage />} />
                    <Route path="edit/:id" element={<EditTask />} />
                  </Route>
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
        {/* </ColorModeContextProvider> */}
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
