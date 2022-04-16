import { Typography,Paper,TextField,Button,InputAdornment,IconButton,OutlinedInput,Alert} from "@mui/material";
import {Visibility,VisibilityOff} from '@mui/icons-material';
import {useState,useRef} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useUserAuth} from "../context/UserAuthContext";

function Signup(){

    const {signUp} = useUserAuth();

    const navigate = useNavigate();

    const [values, setValues] = useState({password: '',showPassword: false});
    const [error,setError] = useState("");
    
    const nameref=useRef();
    const emailref=useRef();
    const passwordref=useRef();

    //for Password toggle
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

    //for string formatting
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

    //form submission
    const handleSubmit= async (e)=>{
        e.preventDefault();
        document.getElementById('logsin').style.visibility='hidden';
        document.getElementById('signsup').style.visibility='hidden';
        var temp_name=nameref.current.value;
        temp_name=ltrim(temp_name);
        temp_name=rtrim(temp_name);
        var temp_email=emailref.current.value;
        temp_email=ltrim(temp_email);
        temp_email=rtrim(temp_email);
        var temp_password=passwordref.current.value;
        temp_password=ltrim(temp_password);
        temp_password=rtrim(temp_password);
        if(temp_name==="")
        {
            setError("Please enter a proper Name");
            document.getElementById('logsin').style.visibility='visible';
            document.getElementById('signsup').style.visibility='visible';
            return;
        }
        if(temp_email==="")
        {
            setError("Please enter a proper Email Id");
            document.getElementById('logsin').style.visibility='visible';
            document.getElementById('signsup').style.visibility='visible';
            return;
        }
        if(temp_password==="" || temp_password!==values.password)
        {
            setError("Passwords do not match");
            document.getElementById('logsin').style.visibility='visible';
            document.getElementById('signsup').style.visibility='visible';
            return;
        }
        setError("");
        try{
            await signUp(temp_email,temp_password);
            navigate("/");
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
            <Paper style={{width:700,height:820,marginLeft:"auto",marginRight:"auto",border:'2px solid black'}}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                <Typography style={{fontFamily:"Poppins",fontSize:50,textAlign:"center",background:"#2196f3"}}>Welcome to <b>XYZ MART</b></Typography>
                <Typography style={{fontFamily:"Poppins",fontSize:40,textAlign:"center",marginTop:10,marginBottom:10,background:'#c6ff00'}}>Create a new account...</Typography>
                {error && <Alert severity="error" style={{marginBottom:10}} onClose={()=>{setError("")}}>{error}</Alert>}
                <Paper style={{padding:5,fontFamily:'Mochiy Pop One',fontSize:'40',border:'1px solid black'}}>
                    <div style={{marginLeft:"13%"}}>
                    <Typography style={{fontFamily:'Mochiy Pop One',fontSize:'40',marginBottom:10,marginTop:10}}>Name</Typography>
                    <TextField 
                        variant="outlined"
                        style={{width:"80%"}}
                        inputRef={nameref}
                    />
                    <br/>
                    <Typography style={{fontFamily:'Mochiy Pop One',fontSize:'40',marginBottom:10,marginTop:10}}>Email Id</Typography>
                    <TextField 
                        variant="outlined"
                        style={{width:"80%"}}
                        inputRef={emailref}
                    />
                    <Typography style={{fontFamily:'Mochiy Pop One',fontSize:'40',marginTop:20,marginBottom:10}}>Password</Typography>
                    <TextField
                        type='password'
                        style={{width:"80%"}}
                        inputRef={passwordref}
                    />
                    <Typography style={{fontFamily:'Mochiy Pop One',fontSize:'40',marginTop:20,marginBottom:10}}>Confirm Password</Typography>
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
                    <Button id="signsup" variant="contained" style={{width:"80%",marginTop:20,height:50,fontFamily:'Poppins',marginBottom:10,fontSize:25}} type="submit">Create Account</Button>
                    </div>
                </Paper>
                <Paper style={{marginTop:10,border:'1px solid black'}}>
                    <div style={{marginLeft:'13%'}}>
                        <Typography style={{fontFamily:"Poppins",fontSize:38}}>Already have an account??</Typography>
                        <Button id="logsin" variant="contained" style={{width:'80%',height:50,fontFamily:"Poppins",fontSize:25,marginBottom:20,marginTop:10}}><Link to="/" style={{textDecoration:"none",color:"whitesmoke",width:"100%"}}>Log In</Link></Button>
                    </div>
                </Paper>
                </form>
            </Paper>
        </div>
    )

}
export default Signup;