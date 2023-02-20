import useTitle from "@/hooks/use-title"
import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';


const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    useTitle('Dashboard')
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        {/* <EarningCard isLoading={isLoading} /> */}
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        {/* <TotalOrderLineChartCard isLoading={isLoading} /> */}
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                {/* <TotalIncomeDarkCard isLoading={isLoading} /> */}
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                {/* <TotalIncomeLightCard isLoading={isLoading} /> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {/* <PopularCard isLoading={isLoading} /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;