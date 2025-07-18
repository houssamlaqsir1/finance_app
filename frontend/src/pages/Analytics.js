import React, { useContext, useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Button,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MovieIcon from '@mui/icons-material/Movie';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DownloadIcon from '@mui/icons-material/Download';

// Dashboard Component - importing this to reuse the sidebar
import Dashboard from '../components/Dashboard';

const Analytics = () => {
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);
  const [timeRange, setTimeRange] = useState('30days');
  const [animatedItems, setAnimatedItems] = useState({
    header: false,
    charts: false,
    insights: false
  });

  // Mock data for demo
  const expenseByCategoryData = [
    { category: "Housing", amount: 1500, percentage: 35, color: theme.palette.primary.main, icon: <HomeIcon /> },
    { category: "Food", amount: 800, percentage: 20, color: theme.palette.success.main, icon: <RestaurantIcon /> },
    { category: "Transportation", amount: 400, percentage: 10, color: theme.palette.warning.main, icon: <DirectionsCarIcon /> },
    { category: "Entertainment", amount: 300, percentage: 7, color: theme.palette.error.main, icon: <MovieIcon /> },
    { category: "Shopping", amount: 350, percentage: 8, color: theme.palette.secondary.main, icon: <ShoppingBagIcon /> },
    { category: "Groceries", amount: 350, percentage: 8, color: theme.palette.info.main, icon: <LocalGroceryStoreIcon /> },
    { category: "Healthcare", amount: 200, percentage: 5, color: "#9c27b0", icon: <HealthAndSafetyIcon /> },
    { category: "Other", amount: 300, percentage: 7, color: "#607d8b", icon: <AccountBalanceWalletIcon /> },
  ];

  const monthlySpendingData = [
    { month: "Jan", amount: 3800 },
    { month: "Feb", amount: 3600 },
    { month: "Mar", amount: 3950 },
    { month: "Apr", amount: 3700 },
    { month: "May", amount: 3850 },
    { month: "Jun", amount: 4100 },
    { month: "Jul", amount: 4200 },
    { month: "Aug", amount: 4000 },
    { month: "Sep", amount: 4300 },
    { month: "Oct", amount: 4200 },
    { month: "Nov", amount: 4100 },
    { month: "Dec", amount: 4500 },
  ];

  const incomeVsExpenseData = [
    { month: "Jan", income: 5000, expenses: 3800, savings: 1200 },
    { month: "Feb", income: 5000, expenses: 3600, savings: 1400 },
    { month: "Mar", income: 5000, expenses: 3950, savings: 1050 },
    { month: "Apr", income: 5000, expenses: 3700, savings: 1300 },
    { month: "May", income: 5000, expenses: 3850, savings: 1150 },
    { month: "Jun", income: 5500, expenses: 4100, savings: 1400 },
    { month: "Jul", income: 5500, expenses: 4200, savings: 1300 },
    { month: "Aug", income: 5500, expenses: 4000, savings: 1500 },
    { month: "Sep", income: 5500, expenses: 4300, savings: 1200 },
    { month: "Oct", income: 5500, expenses: 4200, savings: 1300 },
    { month: "Nov", income: 5800, expenses: 4100, savings: 1700 },
    { month: "Dec", income: 6000, expenses: 4500, savings: 1500 },
  ];

  const financialInsights = [
    {
      title: "Your spending on Entertainment increased by 15%",
      description: "Consider reviewing your subscription services to identify potential savings.",
      trend: "up",
      category: "Entertainment"
    },
    {
      title: "You saved 25% more this month compared to last month",
      description: "Great job! You're on track to meet your annual savings goal.",
      trend: "up",
      category: "Savings"
    },
    {
      title: "Your grocery spending is lower than usual",
      description: "You spent $50 less on groceries compared to your monthly average.",
      trend: "down",
      category: "Groceries"
    },
    {
      title: "Recurring monthly subscriptions total $85",
      description: "This represents 8% of your discretionary spending budget.",
      trend: "neutral",
      category: "Subscriptions"
    }
  ];

  // Animation on mount
  useEffect(() => {
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, header: true })), 100);
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, charts: true })), 300);
    setTimeout(() => setAnimatedItems(prev => ({ ...prev, insights: true })), 500);
  }, []);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const found = expenseByCategoryData.find(item => item.category === category);
    if (found) return found.icon;
    return <AccountBalanceWalletIcon />;
  };

  return (
    <Dashboard>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box 
          sx={{ 
            mb: 4,
            opacity: animatedItems.header ? 1 : 0,
            transform: animatedItems.header ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Analytics
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Track your financial trends and gain insights
              </Typography>
            </Box>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="time-range-select-label">Time Range</InputLabel>
              <Select
                labelId="time-range-select-label"
                id="time-range-select"
                value={timeRange}
                label="Time Range"
                onChange={handleTimeRangeChange}
              >
                <MenuItem value="30days">Last 30 Days</MenuItem>
                <MenuItem value="3months">Last 3 Months</MenuItem>
                <MenuItem value="6months">Last 6 Months</MenuItem>
                <MenuItem value="1year">Last 12 Months</MenuItem>
                <MenuItem value="ytd">Year to Date</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Charts Section */}
        <Grid container spacing={3} mb={4}>
          {/* Spending by Category - Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                opacity: animatedItems.charts ? 1 : 0,
                transform: animatedItems.charts ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.1s',
              }}
            >
              <CardHeader 
                title="Spending by Category" 
                titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
                action={
                  <PieChartIcon color="action" />
                }
              />
              <Divider />
              <CardContent sx={{ pt: 2, pb: 1 }}>
                {/* This would be a chart in a real app, showing placeholder content */}
                <Box sx={{ height: 200, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    [Pie Chart Visualization]
                  </Typography>
                </Box>
                
                {/* Legend */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {expenseByCategoryData.map((item) => (
                    <Chip
                      key={item.category}
                      label={`${item.category}: ${item.percentage}%`}
                      size="small"
                      sx={{ 
                        bgcolor: `${item.color}15`,
                        color: item.color,
                        borderRadius: '4px',
                        '& .MuiChip-label': { px: 1 },
                      }}
                      icon={
                        <Box sx={{ color: item.color, display: 'flex', ml: 0.5 }}>
                          {React.cloneElement(item.icon, { fontSize: 'small' })}
                        </Box>
                      }
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Monthly Spending - Bar Chart */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                opacity: animatedItems.charts ? 1 : 0,
                transform: animatedItems.charts ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.2s',
              }}
            >
              <CardHeader 
                title="Monthly Spending" 
                titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
                action={
                  <BarChartIcon color="action" />
                }
              />
              <Divider />
              <CardContent>
                {/* This would be a chart in a real app, showing placeholder content */}
                <Box sx={{ height: 200, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    [Bar Chart Visualization]
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Average monthly spending: {formatCurrency(4000)}
                  </Typography>
                  <Button size="small" startIcon={<DateRangeIcon />}>
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Income vs Expense */}
          <Grid item xs={12}>
            <Card 
              sx={{ 
                opacity: animatedItems.charts ? 1 : 0,
                transform: animatedItems.charts ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease 0.3s',
              }}
            >
              <CardHeader 
                title="Income vs. Expenses" 
                titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
                action={
                  <Button size="small" startIcon={<DownloadIcon />}>
                    Export
                  </Button>
                }
              />
              <Divider />
              <CardContent>
                {/* This would be a chart in a real app, showing placeholder content */}
                <Box sx={{ height: 300, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    [Line Chart Visualization]
                  </Typography>
                </Box>

                {/* Summary Stats */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="overline" color="text.secondary">
                        TOTAL INCOME
                      </Typography>
                      <Typography variant="h5" color="primary.main" fontWeight="medium">
                        {formatCurrency(64300)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="overline" color="text.secondary">
                        TOTAL EXPENSES
                      </Typography>
                      <Typography variant="h5" color="error.main" fontWeight="medium">
                        {formatCurrency(48300)}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="overline" color="text.secondary">
                        SAVINGS RATE
                      </Typography>
                      <Typography variant="h5" color="success.main" fontWeight="medium">
                        25%
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Financial Insights */}
        <Box 
          sx={{ 
            mb: 2,
            opacity: animatedItems.insights ? 1 : 0,
            transform: animatedItems.insights ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease',
          }}
        >
          <Typography variant="h6" fontWeight="medium" gutterBottom>
            Personalized Insights
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {financialInsights.map((insight, index) => (
            <Grid 
              item 
              xs={12} 
              md={6} 
              key={index}
              sx={{ 
                opacity: animatedItems.insights ? 1 : 0,
                transform: animatedItems.insights ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${0.1 * (index + 1)}s`,
              }}
            >
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', mb: 1 }}>
                    <Box sx={{ mr: 2 }}>
                      <Chip 
                        size="small" 
                        label={insight.trend === 'up' ? 'Up' : insight.trend === 'down' ? 'Down' : 'Neutral'} 
                        sx={{ 
                          bgcolor: 
                            insight.trend === 'up' 
                              ? `${theme.palette.error.main}15` 
                              : insight.trend === 'down'
                              ? `${theme.palette.success.main}15`
                              : `${theme.palette.info.main}15`,
                          color: 
                            insight.trend === 'up' 
                              ? theme.palette.error.main 
                              : insight.trend === 'down'
                              ? theme.palette.success.main
                              : theme.palette.info.main,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight="medium" gutterBottom>
                        {insight.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {insight.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Chip 
                          label={insight.category} 
                          size="small" 
                          sx={{ 
                            mr: 1, 
                            fontSize: '0.7rem',
                            height: 20,
                          }} 
                        />
                        <Typography variant="caption" color="text.secondary">
                          Based on your recent transactions
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Learning Resources Section */}
        <Paper 
          sx={{ 
            p: 3, 
            mt: 4,
            opacity: animatedItems.insights ? 1 : 0,
            transform: animatedItems.insights ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease 0.5s',
            background: `linear-gradient(to right, ${theme.palette.primary.main}15, ${theme.palette.primary.light}10)`,
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Financial Learning Resources
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Based on your spending patterns, here are some resources to help you optimize your finances:
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Chip 
                  size="small" 
                  label="1" 
                  sx={{ 
                    height: 24, 
                    width: 24, 
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                  }} 
                />
              </ListItemIcon>
              <ListItemText 
                primary="How to reduce your monthly subscription costs"
                secondary="5 min read • Recommended based on your subscription spending"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Chip 
                  size="small" 
                  label="2" 
                  sx={{ 
                    height: 24, 
                    width: 24, 
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                  }} 
                />
              </ListItemIcon>
              <ListItemText 
                primary="Optimizing your food budget without sacrificing quality"
                secondary="8 min read • Relevant to your grocery spending patterns"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Chip 
                  size="small" 
                  label="3" 
                  sx={{ 
                    height: 24, 
                    width: 24, 
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                  }} 
                />
              </ListItemIcon>
              <ListItemText 
                primary="Setting up automated savings for your financial goals"
                secondary="4 min read • Recommended for increasing your savings rate"
              />
            </ListItem>
          </List>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="outlined" color="primary">
              View All Resources
            </Button>
          </Box>
        </Paper>
      </Container>
    </Dashboard>
  );
};

export default Analytics; 