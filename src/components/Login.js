import { Typography,Paper , TextField,Button,InputAdornment,IconButton,OutlinedInput,Alert} from "@mui/material";
import {Visibility,VisibilityOff} from '@mui/icons-material';
import {useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";

function Login(){

    const [values, setValues] = useState({
        password: '',
        showPassword: false
    });

    const [error,setError] = useState("");
    const navigate=useNavigate();
    const emailref = useRef();
    const {logIn,googleSignIn} = useUserAuth();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({...values,showPassword: !values.showPassword,
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const ltrim = (text) =>{
        var len=text.length;
        var new_text="";
        for(var i=0;i<len;i++)
        {            
            if(text[i]!==' ')
            {
                for(var j=i;j<len;j++)
                {
                    new_text+=text[j];
                }
                return new_text;
            }
        }
        return new_text;
    }
    const rtrim = (text) =>{
        var len=text.length;
        var new_text="";
        for(var i=len-1;i>=0;i--)
        {
            if(text[i]!==' ')
            {
                for(var j=i;j>=0;j--)
                {
                    new_text+=text[j];
                }
                return new_text.split('').reverse().join('');
            }
        }
        return new_text;
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        document.getElementById('logsin').style.visibility='hidden';
        document.getElementById('logsgooglein').style.visibility='hidden';
        document.getElementById('signsup').style.visibility='hidden';
        var uemail=emailref.current.value;
        uemail=ltrim(uemail);
        uemail=rtrim(uemail);
        var ppassword = values.password;
        ppassword = ltrim(ppassword);
        ppassword = rtrim(ppassword);
        if(uemail==="")
        {
            setError("Please input a valid email id");
            document.getElementById('logsin').style.visibility='visible';
            document.getElementById('logsgooglein').style.visibility='visible';
            document.getElementById('signsup').style.visibility='visible';
            return;
        }
        if(ppassword==="")
        {
            setError("Please input proper password");
            document.getElementById('logsin').style.visibility='visible';
            document.getElementById('logsgooglein').style.visibility='visible';
            document.getElementById('signsup').style.visibility='visible';
            return;
        }
        setError("");
        try{
            await logIn(uemail,values.password);
            navigate("/home");
        }
        catch(err){
            setError(err.message);
        }
        document.getElementById('logsin').style.visibility='visible';
        document.getElementById('logsgooglein').style.visibility='visible';
        document.getElementById('signsup').style.visibility='visible';

    }
    const handleGoogleSignIn = async (e) =>{
        e.preventDefault();
        document.getElementById('logsin').style.visibility='hidden';
        document.getElementById('logsgooglein').style.visibility='hidden';
        document.getElementById('signsup').style.visibility='hidden';
        try{
            await googleSignIn();
            navigate("/home");
        }
        catch(err){
            document.getElementById('logsin').style.visibility='visible';
            document.getElementById('logsgooglein').style.visibility='visible';
            document.getElementById('signsup').style.visibility='visible';
            setError(err.message);
        }
    }
    return(
        <div className="signi" style={{height:940,width:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Paper style={{width:700,height:700,marginLeft:"auto",marginRight:"auto",border:'2px solid black'}}>
                <Typography style={{fontFamily:"Poppins",fontSize:50,textAlign:"center",background:"#2196f3"}}>Welcome to <b>XYZ MART</b></Typography>
                <Typography style={{fontFamily:"Poppins",fontSize:40,textAlign:"center",marginTop:10,marginBottom:10,background:'#c6ff00'}}>Please Login to continue...</Typography>
                <Paper style={{padding:5,border:'1px solid black'}}>
                    {error && <Alert severity="error" onClose={()=>setError('')}>{error}</Alert>}
                    <div style={{marginLeft:"13%"}}>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                    <Typography style={{fontFamily:'Mochiy Pop One',fontSize:'40',marginBottom:10,marginTop:10}}>User Id</Typography>
                    <TextField 
                        variant="outlined"
                        style={{width:"80%"}}
                        inputRef={emailref}
                    />
                    <br/>
                    <Typography style={{fontFamily:'Mochiy Pop One',fontSize:'40',marginTop:20,marginBottom:10}}>Password</Typography>
                    <OutlinedInput
                        style={{width:'80%'}}
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    <Button id="logsin" variant="contained" style={{width:"80%",marginTop:20,height:50,fontFamily:'Poppins',marginBottom:10,fontSize:25}} type="submit">Log In</Button>
                    </form>
                    <hr style={{width:'80%',marginLeft:'0%',height:2,background:'black'}}/>
                    <Button id="logsgooglein" variant="contained" style={{width:"80%",marginTop:10,height:50,fontFamily:'Poppins',marginBottom:10,fontSize:25}} onClick={handleGoogleSignIn}>Log In With Google</Button>
                    </div>
                </Paper>
                <Paper style={{marginTop:10,border:'1px solid black'}}>
                    <div style={{marginLeft:'13%'}}>
                        <Typography style={{fontFamily:"Poppins",fontSize:38}}>Don't have an account??</Typography>
                        <Button id='signsup' variant="contained" style={{width:'80%',height:50,fontFamily:"Poppins",fontSize:25,marginBottom:20,marginTop:10}}><Link to="/signup"  style={{textDecoration:"none",color:'whitesmoke',width:"100%"}}>Sign Up</Link></Button>
                    </div>
                </Paper>
            </Paper>
        </div>
    )
}
export default Login;