import '../styles/globals.css'
import React, { useState, useEffect } from "react";
// Handle console logs
import "../utils/dropConsole";
// Styles
// import "fontsource-roboto";
// ROUTER
import { useRouter } from "next/router";
// MUI Theme & SASS
import { ThemeProvider, Button, createMuiTheme } from "@material-ui/core";
// import { ThemeSwitch } from "components/ThemeSwitch";
import { dark, light } from "../styles/muiTheme";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../shared/style/scss/style.scss"
import "../styles/custom.scss"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ProvideAuth } from "../shared/packages/provider/authBase"
import { AccessControlProvider } from "../shared/packages/provider/accessGateway"
// Redux
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from '../redux/store'
import { loadMasterData, loadRelatedUser, loadDSNV3KV } from "../redux/actions/masterDataAction"
//Layout
import NonLayOut from "../shared/packages/layout/non-layout"
import Loading from "../component/loading/loadingComponent"
//Service
import { ToastProvider } from 'react-toast-notifications';
//Language
import { I18nextProvider } from 'react-i18next';
import i18n from '../locales/index';
import Script from 'next/script'

function Default({ Component, pageProps }) {
  const router = useRouter();
  const Layout = Component?.Layout ?? NonLayOut;
  const [darkState, setDarkState] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loadLazyCSS = (link) => {
    var cssMain = document.createElement('link');
    cssMain.href = link;
    cssMain.rel = 'stylesheet';
    cssMain.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(cssMain);
  }

  useEffect(() => {
    loadLazyCSS('/asset/css/main.min.css');
    loadLazyCSS('/asset/css/plugins.min.css');
    loadLazyCSS('/asset/fonts/all.css');

    dispatch(loadMasterData({
    }));

    dispatch(loadRelatedUser({
    }));

    dispatch(loadDSNV3KV({
    }));

  }, [])

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <ProvideAuth>
      {/* <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" /> */}
      <Script src="/asset/js/plugins.min.js" strategy='beforeInteractive' />
      <Script src="/asset/js/main.min.js" strategy='lazyOnload' />
      <AccessControlProvider>
        <I18nextProvider i18n={i18n}>
          <ToastProvider autoDismiss={true} autoDismissTimeout={2000} placement="bottom-right">
            <Layout>
              <ThemeProvider theme={darkState ? dark() : light()}>
                <Loading loading={loading} />
                <Component {...pageProps} />
              </ThemeProvider>
            </Layout>
          </ToastProvider>
        </I18nextProvider>
      </AccessControlProvider>
    </ProvideAuth>
  )
}

export default wrapper.withRedux(Default)
