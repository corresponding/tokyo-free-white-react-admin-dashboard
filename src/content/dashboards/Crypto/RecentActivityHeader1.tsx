import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled
} from '@mui/material';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import FunctionsIcon from '@mui/icons-material/Functions';
import SourceIcon from '@mui/icons-material/Source';
import NearMeIcon from '@mui/icons-material/NearMe';
import axios from 'axios';
import cookie from 'react-cookies';
import { useState, useEffect } from 'react';
import { SummaryFormat } from 'src/models/summary_format';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivityHeader1() {
  const theme = useTheme();
  const [summary, setSummary] = useState<SummaryFormat>({
    count_num: 0,
    count_distinct: 0,
    source_num: 0,
    source_distinct: 0,
    destination_num: 0,
    destination_distinct: 0,
    time_num: 0,
    time_distinct: 0,
    protocol_num: 0,
    protocol_distinct: 0,
    length_num: 0,
    length_distinct: 0
  });

  useEffect(() => {
    //仅在componentDidMount的时候执行
    getdata();
  }, []);

  const getdata = () => {
    axios
      .create({
        headers: {
          token: cookie.load('token'),
          'Cache-Control': 'no-cache'
        }
      })
      .get('/api/summary')
      .then((response) => {
        // handle success
        // console.log(response);
        let { data } = response.data;
        console.log(data);
        setSummary(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <Card>
      {/* <CardHeader title="Recent Activity" /> */}
      <Divider />
      <Box px={10} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <FunctionsIcon />
        </AvatarPrimary>
        <Box pl={6} flex={1}>
          <Typography variant="h3">Count</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant="h2">{summary.count_num}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Distinct
              </Typography>
              <Typography variant="h2">{summary.count_distinct}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={10} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <SourceIcon />
        </AvatarPrimary>
        <Box pl={6} flex={1}>
          <Typography variant="h3">Source</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant="h2">{summary.source_num}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Distinct
              </Typography>
              <Typography variant="h2">{summary.source_distinct}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={10} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <NearMeIcon />
        </AvatarPrimary>
        <Box pl={6} flex={1}>
          <Typography variant="h3">Destination</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant="h2">{summary.destination_num}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Distinct
              </Typography>
              <Typography variant="h2">
                {summary.destination_distinct}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default RecentActivityHeader1;
