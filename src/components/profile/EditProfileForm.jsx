import './edit.css'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { TextField, 
          Box, 
          FormControl, 
          InputLabel, 
          MenuItem, 
          Select, 
          Button } from '@material-ui/core';

import extUri from '../../config'

export default function EditProfileForm() {
  const API_BE = process.env.REACT_APP_API_BE || extUri().API_BE
  const { user:currentUser } = useContext(AuthContext)
  const [profile, setProfile] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchProfile = async () => {
    const headers = {
      "Authorization": `Bearer ${currentUser?.access}`
    }
    const res = await axios.get(API_BE + 'account/profile', { headers: headers })
    if (res.status === 200) {
      setProfile(res.data)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleChange = (event, type) => {
    console.log(type)
    if(type === 'firstName'){
      setProfile({...profile, user: {...profile['user'], first_name:event.target.value}})
    }
    else if(type === 'lastName'){
      setProfile({...profile, user: {...profile['user'], last_name:event.target.value}})
    }
    else if(type === 'phone'){
      setProfile({...profile, phone: event.target.value})
    }
    else if(type === 'dob'){
      setProfile({...profile, dob: event.target.value})
    }
    else if(type === 'about'){
      setProfile({...profile, about: event.target.value})
    }
    else if(type === 'fullAddress'){
      setProfile({...profile, full_address: event.target.value})
    }
    else if(type === 'state'){
      setProfile({...profile, state: event.target.value})
    }
    else if(type === 'country'){
      setProfile({...profile, country: event.target.value})
    }
    else if(type === 'postCode'){
      setProfile({...profile, postcode: event.target.value})
    }
    else if(type === 'relationship'){
      setProfile({...profile, relationship: event.target.value})
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    const headers = {
      "Authorization": `Bearer ${currentUser?.access}`
    }
    let userData = {
      user: {
        first_name: profile?.user?.first_name,
        last_name: profile?.user?.last_name,
      },
      dob: profile?.dob,
      phone: profile?.phone,
      about: profile?.about,
      city: profile?.city,
      full_address: profile?.full_address,
      state: profile?.state,
      country: profile?.country,
      postcode: profile?.postcode,
      relationship: profile?.relationship
    }
    let res = await axios.patch(API_BE + 'account/profile', userData, {headers: headers})
    if(res.status === 200){
      navigate(`/profile/${id}`)
    }
  }

  if (id != currentUser?.id) {
    return <Navigate to={`/profile/${id}`} />
  } else {
    return (
      <div className='profileForm'>
        <div className='formWrapper'>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={profile?.user?.email || ""}
                type='email'
                placeholder='Email'
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                required
                id="outlined-required"
                label="First Name"
                value={profile?.user?.first_name || ""}
                placeholder='First Name'
                onChange={(e)=>handleChange(e, 'firstName')}
              />
              <TextField
                required
                id="outlined-required"
                label="Last Name"
                value={profile?.user?.last_name || ""}
                placeholder='Last Name'
                onChange={(e)=>handleChange(e, 'lastName')}
              />
            </div>
            <br />
            <div>
              <TextField
                required
                id="outlined-required"
                label="Username"
                value={profile?.user?.username || ""}
                placeholder='Username'
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Phone Number"
                type="number"
                value={profile?.phone || ''}
                placeholder='Phone'
                onChange={(e)=>handleChange(e, 'phone')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="DOB"
                type="date"
                value={profile?.dob || ''}
                onChange={(e)=>handleChange(e, 'dob')}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="About"
                value={profile?.about || ''}
                placeholder='About'
                onChange={(e)=>handleChange(e, 'about')}
              />
              <TextField
                id="outlined-number"
                label="City"
                placeholder='City'
                value={profile?.city || ''}
              />
              <TextField
                id="outlined-number"
                label="Full Address"
                placeholder='Full Address'
                value={profile?.full_address || ''}
                onChange={(e)=>handleChange(e, 'fullAddress')}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="State"
                value={profile?.state || ''}
                placeholder='State'
                onChange={(e)=>handleChange(e, 'state')}
              />
              <TextField
                id="outlined-number"
                label="Country"
                placeholder='Country'
                value={profile?.country || ''}
                onChange={(e)=>handleChange(e, 'country')}
              />
              <TextField
                id="outlined-number"
                label="Postcode"
                placeholder='Postcode'
                type='number'
                value={profile?.postcode || ''}
                onChange={(e)=>handleChange(e, 'postCode')}
              />
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Relationship Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={profile?.relationship || ""}
                  label="Age"
                  onChange={(e)=>handleChange(e, 'relationship')}
                >
                  <MenuItem value={"single"}>Single</MenuItem>
                  <MenuItem value={"commited"}>Commited</MenuItem>
                  <MenuItem value={"no interest"}>Not Interested</MenuItem>
                  <MenuItem value={"married"}>Married</MenuItem>
                  <MenuItem value={"complicated"}>Complicated</MenuItem>
                </Select>
              </FormControl>
            </div>
            <br />
            <Button onClick={(e)=>handleSubmit(e)} variant="contained">Update</Button>
          </Box>
        </div>
      </div>
    )
  }
}
