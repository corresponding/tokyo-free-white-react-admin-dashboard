import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import AccountBalance2 from './AccountBalance2';
import AccountBalance3 from './AccountBalance3';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import AccountBalance4 from './AccountBalance4';
import AccountBalance5 from './AccountBalance5';
import AccountBalance6 from './AccountBalance6';

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Crypto Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={12} xs={12}>
            <AccountBalance2 />
          </Grid>
          <Grid item lg={12} xs={12}>
            <AccountBalance4 />
          </Grid>
          <Grid item xs={12}>
            <AccountBalance3 />
          </Grid>
          <Grid item xs={12}>
            <AccountBalance5 />
          </Grid>
          <Grid item xs={12}>
            <AccountBalance6 />
          </Grid>
          {/* <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
