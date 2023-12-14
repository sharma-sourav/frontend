"use client"

import * as React from "react"
import Radio from "@mui/material/Radio"
import { useState, useEffect } from "react"
import { useTheme } from "@mui/material/styles"
import Pagination from "@mui/material/Pagination"
import "./list.css"
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { alpha } from "@mui/material/styles"
import EditIcon from "@mui/icons-material/Edit"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import TextField from "@mui/material/TextField"
import Link from "next/link"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import { makeStyles } from "@mui/styles"
import { employe, getAllEmployees } from "../Redux/Slice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import { deleteEmployeeById } from "../Redux/Slice"
import FormLabel from "@mui/material/FormLabel"
import { deepOrange } from "@mui/material/colors"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useRouter } from "next/dist/client/components/navigation"
import { UpdateEmployee } from "../Redux/Slice"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import Divider from "@mui/material/Divider"
import ArchiveIcon from "@mui/icons-material/Archive"
import FileCopyIcon from "@mui/icons-material/FileCopy"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DeleteIcon from '@mui/icons-material/Delete';
const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})
const useStyles = makeStyles((theme) => ({
  noUnderline: {
    textDecoration: "none",
    color: "black",
  },
}))

const usemargin = makeStyles((theme) => ({
  margin: {
    marginLeft: "1%",
  },
}))

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Angular',
  'Aws',
  'Css',
  'c++',
  'Html',
  'Java',
  'Next js ',
  'Nest js ',
  'Node js',
  'python',
  'React js ',
  'Sql',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === 4 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

export default function MiniDrawer() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const opene = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const employees = useSelector((state) => state.employeeList.employees)
  // console.log(employe);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const storedData = localStorage.getItem("userData")
    const userData = JSON.parse(storedData)
    console.log("hello ", userData)
    if (userData && userData.user && userData.user.firstname) {
      const initials = userData.user.firstname.slice(0, 2).toUpperCase()
      setFirstNameInitials(initials)
    }
  }, [])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const employeesToDisplay = employees.slice(startIndex, endIndex)
  const handleDelete = async (id, index) => {
    try {
      if (window.confirm("Are you sure you want to delete this employee?")) {
        await dispatch(deleteEmployeeById(id))
        const updatedEmployees = [
          ...employees.slice(0, index),
          ...employees.slice(index + 1),
        ]
        dispatch(getAllEmployees(updatedEmployees))
      }
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error("Error deleting employee:", error)
    }
  }
  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }
  // const loading = useSelector((state) => state.employeeList.loading);
  // const error = useSelector((state) => state.employeeList.error);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [editProfilePicture, setEditprofilePicture] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [firstNameInitials, setFirstNameInitials] = useState("")
  const [anchorE2, setAnchorE2] = React.useState(null)
  const openeee = Boolean(anchorE2)
  const handleClicko = (event) => {
    setAnchorE2(event.currentTarget)
  }
  const handleClosee = () => {
    setAnchorE2(null)
  }
  const openAddUserModal = () => {
    setAddUserModalOpen(true)
  }

  const openEditUserModal = (emp) => {
    setEditUserModalOpen(true)
    setSelectedEmployee(emp)

    setFormData({
      name: emp.name,
      skill: emp.skill,
      email: emp.email,
      phone: emp.phone,
      company: emp.company,
      experience: emp.experience,
      freelancer: emp.freelancer,
      file: emp.imglink,
    })
  }

  const closeAddUserModal = () => {
    setSelectedSkills([])
    setAddUserModalOpen(false)
    setEditUserModalOpen(false)
  }
  const handleEditUser = async () => {
    let updatedEmployeeData = { ...formData }

    if (!!!editProfilePicture) {
      delete updatedEmployeeData["file"]
      console.log("update ", updatedEmployeeData)
    }

    try {
      await dispatch(
        UpdateEmployee({ id: selectedEmployee.id, ...updatedEmployeeData })
      )
      setEditprofilePicture("")
      updatedEmployeeData = null
      closeAddUserModal()
    } catch (error) {
      // Handle the error
      console.error("Error updating employee:", error)
    } finally {
      dispatch(getAllEmployees()) // You may not need this depending on your requirements
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    setProfilePicture(null)
    setSelectedSkills([])
    const newEmptyFields = {}
    let hasEmptyFields = false

    for (const key in formData) {
      if (formData[key] === "") {
        newEmptyFields[key] = true
        hasEmptyFields = true
      } else {
        newEmptyFields[key] = false
      }
    }

    setEmptyFields(newEmptyFields)

    if (hasEmptyFields) {
      // Handle empty fields (e.g., show an alert)
      console.log("Fill in all input fields")
    } else {
      const employeeData = new FormData()
      employeeData.append("name", formData.name)
      employeeData.append("skill", formData.skill)
      employeeData.append("email", formData.email)
      employeeData.append("phone", formData.phone)
      employeeData.append("company", formData.company)
      employeeData.append("experience", formData.experience)
      employeeData.append("freelancer", formData.freelancer)
      employeeData.append("file", formData.file)

      try {
        await dispatch(employe(employeeData))
        console.log("Data:", formData)
        if (emptyFields != null) {
          closeAddUserModal()
        }
      } catch (error) {
        // Handle the error
      } finally {
        // Move dispatch(getAllEmployees()) here to ensure it is called after employe action
        dispatch(getAllEmployees())
      }
    }
  }

  useEffect(() => {
    // You may not need this initial dispatch here, depending on your requirements
    dispatch(getAllEmployees())
  }, [dispatch])

  const [emptyFields, setEmptyFields] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    skill: "",
    email: "",
    phone: "",
    company: "",
    experience: "",
    freelancer: "",
    file: null,
  })
  // console.log("name", employees);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    // Ensure a file is selected
    if (selectedFile) {
      // Update formData with the selected file
      setFormData({
        ...formData,
        file: selectedFile,
      })

      // Convert selected file to data URL and set as profile picture
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }
  const handleFileEditChange = (e) => {
    const selectedFile = e.target.files[0]

    // Ensure a file is selected
    if (selectedFile) {
      // Update formData with the selected file
      setFormData({
        ...formData,
        file: selectedFile,
      })

      // Convert selected file to data URL and set as profile picture
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditprofilePicture(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }
  const handleSkillChange = (event) => {
    setSelectedSkills(event.target.value);
    // Update formData with the selected skills
    setFormData({
      ...formData,
      skill: event.target.value,
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (value) {
      setEmptyFields({
        ...emptyFields,
        [name]: false,
      })
    }
  }
  const handlelogout = () => {
    router.push("/login")
    setAnchorEl(null)
  }
 
  const classes = useStyles()
  const classess = usemargin()
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ByteWave Consulting
          </Typography>
          <div>
            <Button
              id="basic-button"
              aria-controls={opene ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opene ? "true" : undefined}
              onClick={handleClick}
              sx={{}}
            >
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {firstNameInitials}
              </Avatar>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={opene}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handlelogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: "DashBoard", link: "../DashBoard" },
            { text: "Userlist", link: "../ListData" },
            { text: "Send email", link: "" },
            { text: "Drafts", link: "" },
          ].map((element, index) => (
            <Link
              href={element.link}
              key={element.text}
              className={classes.noUnderline}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={element.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <div>
          <Button
            variant="contained"
            disableElevation
            onClick={openAddUserModal}
          >
            Add
          </Button>
          <table id="customers">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>skill</th>
                <th>Company</th>
                <th>Freelancer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employeesToDisplay.map((emp, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <Avatar
                      alt="Profile Picture"
                      src={emp.imglink}
                      style={{ width: "50px", height: "50px" }}
                      type="file"
                      onChange={handleFileChange}
                    >
                      {emp.name.substring(0, 2)}
                    </Avatar>
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.skill}</td>
                  <td>{emp.company}</td>
                  <td>{emp.freelancer}</td>

                  <td>
                    {" "}
                    <div>
                      <Button
                        id="demo-customized-button"
                        aria-controls={
                          openeee ? "demo-customized-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openeee ? "true" : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClicko}
                        endIcon={<KeyboardArrowDownIcon />}
                      >
                        Options
                      </Button>
                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorE2}
                        open={openeee}
                        onClose={handleClosee}
                      >
                        <MenuItem
                          onClick={() => {
                            openEditUserModal(emp)
                            handleClosee()
                          }}
                          disableRipple
                        >
                          <EditIcon />
                          Edit
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            handleDelete(emp.id, index)
                            handleClosee()
                          }}
                          disableRipple
                        >
                          <DeleteIcon />
                           Delete
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={handleClosee} disableRipple>
                          <PersonIcon />
                          view
                        </MenuItem>
                        
                      </StyledMenu>
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>  
          </table>
          <Pagination
            count={Math.ceil(employees.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
        <Dialog open={isAddUserModalOpen} onClose={closeAddUserModal}>
          <DialogTitle>Add Employe</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Profile Picture"
                src={profilePicture}
                style={{ width: "100px", height: "100px" }}
                type="file"
              />
              <label htmlFor="fileInput">
                <AddAPhotoIcon />
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="Formset">
              <div className="textfild">
                <TextField
                  label="Name"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Number"
                  id="phone"
                  name="phone"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            
              {/* 
                <TextField
                  label="Skill"
                 
                  id="skill"
                  name="skill"
                  onChange={handleInputChange}
                  fullWidth
                />
              </div> */}
              <div>
              
            </div>
            <div className="Formset">
              <div className="textfild">
                <TextField
                  label="Company"
                  id="company"
                  name="company"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Experience"
                  id="experience"
                  name="experience"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div>
            <div className="Formset" style={{width:"100%"}}>
         
      
   
              <div>
                <TextField
                  label="Email"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              </div>
              <div className="Formset">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Freelancer
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="freelancer"
                  value={formData.freelancer} // Make sure to set the value
                  onChange={handleInputChange} // Handle radio button change
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </div>
              <div className="textfild" id="201">
         <InputLabel id="demo-multiple-chip-label">Skill</InputLabel>
      <Select
       id="skill"
       multiple
       fullWidth
       value={selectedSkills}
       onChange={(event) => handleSkillChange(event)}
       input={<OutlinedInput id="select-multiple-chip" label="Skill" />}
      renderValue={(selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )}
  MenuProps={MenuProps}
>
  {names.map((name) => (
    <MenuItem
      key={name}
      value={name}
      style={getStyles(name, selectedSkills, theme)}
    >
      {name}
    </MenuItem>
  ))}
</Select>
    </div> 
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddUserModal}>Cancel</Button>
            <Button onClick={handleAddUser} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={isEditUserModalOpen} onClose={closeAddUserModal}>
          <DialogTitle>Edit Employe</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Profile Picture"
                  src={editProfilePicture ? editProfilePicture : formData.file}
                  style={{ width: "100px", height: "100px" }}
                  type="file"
                />
                <label htmlFor="fileInput">
                  <AddAPhotoIcon />
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileEditChange}
                  />
                </label>
              </div>
            </div>
            <div className="Formset">
              <div className="textfild">
                <TextField
                  label="Name"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                />
              </div>
              <div>
                <TextField
                  label="Number"
                  id="phone"
                  name="phone"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  value={formData.phone}
                />
              </div>
            </div>
            <div className="Formset">
              <div className="textfild">
                <TextField
                  label="Skill"
                  variant="outlined"
                  id="skill"
                  name="skill"
                  onChange={handleInputChange}
                  fullWidth
                  value={formData.skill}
                />
              </div>
              <div>
                <TextField
                  label="Experience"
                  id="experience"
                  name="experience"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  value={formData.experience}
                />
              </div>
            </div>
            <div className="Formset">
              <div className="textfild">
                <TextField
                  label="Company"
                  id="company"
                  name="company"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  value={formData.company}
                />
              </div>
              {/* <div>
                <TextField
                  label="Eamail"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                />
              </div> */}
            </div>
            <div>
              <div className="Formset">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Freelancer
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="freelancer"
                  value={formData.freelancer}
                  // value={formData.freelancer}
                  onChange={handleInputChange} // Handle radio button change
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddUserModal}>Cancel</Button>
            <Button
              onClick={handleEditUser}
              variant="contained"
              color="primary"
            >
              Update employee
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}
