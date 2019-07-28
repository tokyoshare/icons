import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from "lodash";
import Prism from 'prismjs';


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            platform="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}
const firstToUpper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const SelectIconPanel = (props) => {
    const classNames = ["material-icons", "material-icons-outlined", "material-icons-round", "material-icons-two-tone", "material-icons-sharp"];
    const muSurfixes = ["", "Outlined", "Rounded", "TwoTone", "Sharp"];
    
    let iconType = props.iconType || 0;
    let icon = props.icon;
    let reactIconName = firstToUpper(_.camelCase(icon.id));
    if (icon.id == "3d_rotation") reactIconName = "ThreeDRotation";
    if (icon.id == "4k") reactIconName = "FourK";
    if (icon.id == "360") reactIconName = "ThreeSixty";
    reactIconName = reactIconName + muSurfixes[iconType];

    let iconClassName = classNames[iconType];

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // update highlight again
        Prism.highlightAll();
    });

    let [state, setState] = useState({platform:1});

    //input onchange handler
    const handleChange = fieldName => event => {
        setState({ ...state, [fieldName]: event.target.value });
    }
    const renderBrowser = (
        <React.Fragment>
            <div id="codeblock" className="code-block">
                <div>You need to include this line into your HTML file:</div>
                <pre><code className="language-html">
                    {'<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">'}
                </code></pre>
                <div>Usage:</div>
                <pre><code className="language-html">
                {`<!--For modern browsers-->
<i class="${iconClassName}">${icon.id}</i>`}
                </code></pre>
                <pre><code className="language-html">
{`<!--For IE9 or below.-->
<i class="${iconClassName}">${icon.id}</i>`}
                </code></pre>
            </div>
        </React.Fragment>
    )
    const renderMaterilUI = (
        <React.Fragment>
            <div id="codeblock" className="code-block">
                <pre><code className="language-javascript">
                    {`import ${reactIconName} from "@material-ui/icons/${reactIconName}";
...
<${reactIconName} />
                    `}
                </code></pre>
            </div>
        </React.Fragment>
    )

    return (
        <div className="selected-icon-panel">
            <div className="title">
                <InputLabel htmlFor="platform-label">Platform</InputLabel>
                <Select
                    value={state.platform}
                    onChange={handleChange('platform')}
                    input={<Input name="platform" id="platform-label" />}
                    name="platform"
                >
                    <MenuItem value={1}>Material-UI</MenuItem>
                    <MenuItem value={0}>Browser</MenuItem>
                </Select>
            </div>
            <div>
                {state.platform==1?renderMaterilUI:renderBrowser}
            </div>
        </div >
    )
}

const Icon = (iconName, iconType) => {
    const classNames = ["material-icons", "material-icons-outlined", "material-icons-round", "material-icons-two-tone", "material-icons-sharp"];
    let iconClassName = classNames[iconType];
    //Because alternate_email icon was be wrong, so we will render it default here.
    if(iconType != 0 && iconName=="alternate_email"){
        iconClassName = classNames[0];
    }
    return (<i className={`icon ${iconClassName}`}>{iconName}</i>);
}

const Category = React.memo((props) => {
    let category = props.category;
    let icon = props.icon;
    let iconType = props.iconType;
    let style = {
        fontSize: "12px",
        maxWidth: "70px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        margin: "0 auto"
    }
    return (
        <div className="categories">
            {
                category.icons.map(obj => {
                    let styleName = obj.id == icon.id?"icon icon-selected":"icon";
                    return (
                        <div className={styleName} key={obj.id} onClick={() => props.onSelectIcon(obj)}>
                            <div>{Icon(obj.id, iconType)}</div>
                            <div style={style}>{obj.id}</div>
                        </div>
                    )
                })
            }
        </div>
    )
});

const Categories = (props) => {
    const iconType = props.iconType || 0; //0: filled, 1: outlined, 2: rounded, 3: two-tone, 4:sharp
    const categories = props.data && props.data.categories || [];
    const [value, setValue] = React.useState(0);
    const [selectedIcon, setSelectedIcon] = React.useState(categories[0].icons[0])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if(props.isSearching){
            setValue(0);
        }
    });

    const handleSelectIcon = (newIcon) => {
        setSelectedIcon(newIcon);
        // setTimeout(()=>{
        //     hljs.initHighlighting.called = false;
        //     hljs.initHighlighting();
        // },2000);
    }

    return (
        <div className="tabs">
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    {categories.map((category, index) => {
                        let iconName = category.name=="search" ? "search" : category.icons[0].id;
                        return (
                            <Tab key={index} label={category.name} icon={Icon(iconName, iconType)} {...a11yProps(index)} />
                        )
                    })}
                </Tabs>
            </AppBar>
            <div className="tab-content">
                {
                    categories.map((category, index) => {
                        return (
                            <TabPanel key={index} value={value} index={index}>
                                <Category 
                                    category={category} 
                                    icon={selectedIcon} 
                                    onSelectIcon={handleSelectIcon} 
                                    iconType={iconType}
                                />
                            </TabPanel>
                        )
                    })
                }
                <SelectIconPanel icon={selectedIcon} iconType={iconType} />
            </div>
        </div>
    );
}

export default Categories;