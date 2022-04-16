import { Typography,Alert,Button,CssBaseline,AppBar,Box,Divider,Drawer,List,ListItem,ListItemIcon,ListItemText,Toolbar} from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";
import {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton,Paper,Grid } from "@mui/material";
import BestsellerData from "./BestsellerData";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useNavigate} from "react-router-dom";
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import HomeIcon from '@mui/icons-material/Home';
import LaptopIcon from '@mui/icons-material/Laptop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import HelpIcon from '@mui/icons-material/Help';


const drawerWidth=240;
function Home(props){
    const {user,logOut} = useUserAuth();
    const navigate = useNavigate();
    const {window}=props;
    const [mobileOpen,setMobileOpen] = useState(false);
    const [bought,setBought] = useState(false);
    const handleDrawerToggle=()=>{
        setMobileOpen(!mobileOpen);
    }
    const handleLogout = async () =>{
        try{
            await logOut();
        }
        catch(err){
            console.log(err.message);
        }
    }
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button key="home" onClick={()=>navigate("/home")}>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button key='mobiles' onClick={()=>navigate("/mobile")}>
                    <ListItemIcon><MobileFriendlyIcon/></ListItemIcon>
                    <ListItemText primary='Mobiles' />
                </ListItem>
                <ListItem button key='laptops' onClick={()=>navigate("/laptop")}>
                    <ListItemIcon><LaptopIcon/></ListItemIcon>
                    <ListItemText primary='Laptops' />
                </ListItem>
                <ListItem button key='cart' onClick={()=>navigate("/cart")}>
                    <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
                    <ListItemText primary='Cart' />
                </ListItem>
            </List>
            <Divider />
            <List>
            <ListItem button key='orders' onClick={()=>navigate("/orders")}>
                    <ListItemIcon><LocalMallIcon/></ListItemIcon>
                    <ListItemText primary='Orders' />
                </ListItem>
                <ListItem button key='returns' onClick={()=>navigate("/returns")}>
                    <ListItemIcon><AssignmentReturnIcon/></ListItemIcon>
                    <ListItemText primary='Returns' />
                </ListItem>
                <ListItem button key='help' onClick={()=>navigate("/help")}>
                    <ListItemIcon><HelpIcon/></ListItemIcon>
                    <ListItemText primary='Help' />
                </ListItem>
                <ListItem button key='logout' onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon/></ListItemIcon>
                    <ListItemText primary='Log Out' />
                </ListItem>
            </List>
        </div>
    );
    const container=window!==undefined?()=>window().document.body:undefined;
    return(
        // <div>
        //     {user && <Typography>{user.email}</Typography>}
        //     <Button variant='contained' onClick={handleLogout}>Log Out</Button>
        // </div>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
        >
            <MenuIcon />
        </IconButton>
            <Typography variant="h6" noWrap component="div" onClick={()=>navigate("/home")} style={{cursor:'pointer'}}>
                <b>XYZ MART</b>
            </Typography>
            <Button variant='contained' style={{color:'white',marginLeft:'3%'}} onClick={()=>navigate('/mobile')}>Mobiles</Button>
            <Button variant='contained' style={{color:'white',marginLeft:'3%'}} onClick={()=>navigate('/laptop')}>Laptops</Button>
            <Button variant='contained' style={{color:'white',marginLeft:'3%'}} onClick={()=>navigate('/cart')}>Cart</Button>
            <Button variant='contained' style={{color:'white',marginLeft:'3%'}} onClick={()=>navigate('/orders')}>Orders</Button>
            <Button variant='contained' style={{color:'white',marginLeft:'3%'}} onClick={()=>navigate('/returns')}>Returns</Button>
            <Button variant='contained' style={{color:'white',marginLeft:'3%'}} onClick={()=>navigate('/help')}>Help</Button>
            {bought && <Alert severity="success" style={{width:'300px',border:'2px solid black',marginLeft:'3%'}} onClose={()=>setBought(false)}>Added to cart successfully</Alert>}
            <Button variant='contained' style={{background:'red',color:'white',marginLeft:'5%'}} onClick={handleLogout}>Log Out</Button>
        </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </Drawer>
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
        >
            {drawer}
        </Drawer>
        </Box>
        <Box
            component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
        <Toolbar />
        <div>
        {user && <Typography style={{fontFamily:"Poppins",fontSize:30}}>Welcome {user.email}</Typography>}
        <Typography variant='h4' style={{fontFamily:"Poppins",fontSize:30,background:'red',color:"white",width:'40%',marginBottom:20,border:'1px solid red'}}>The Bestsellers at your doorstep</Typography>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
            {BestsellerData.map((each) =>{
                const {img,title,price}=each;
                return(
                    <Grid key={title} item>
                    <Paper sx={{height: 500,width: 400}} style={{background:"#f0f0f0",border:'1px solid black'}}>
                    <div>
                        <img style={{width:395,height:360}} src={img} alt={title}/>
                        <Typography style={{fontFamily:"Poppins",fontSize:25,textAlign:"center"}}>{title}</Typography>
                        <Typography style={{fontFamily:"Poppins",fontSize:25,textAlign:"center"}}>&#8377; {price}</Typography>
                        <Button style={{textTransform:"none",fontFamily:'Poppins',fontSize:20,left:110}} variant="contained" onClick={()=>setBought(true)} endIcon={<AddShoppingCartIcon/>}>Add to Cart</Button>
                    </div>
                </Paper>
                </Grid>
                )
            })}
        </Grid>
        </Grid>
        </Grid> 
        </div>
        </Box>
    </Box>
    )
}

export default Home;