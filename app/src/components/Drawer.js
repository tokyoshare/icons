import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const useStyles = makeStyles({
    list: {
        width: 300,
    }
});

export default function Drawer(props) {
    const classes = useStyles();

    return (
        <div>
            <SwipeableDrawer
                open={props.open}
                onClose={props.onClose}
            >
                <div className={classes.list} role="presentation">
                    <List>
                        {['Filled', 'Outlined', 'Rounded', 'Two-Tone', 'Sharp'].map((text, index) => (
                            <ListItem button key={text} onClick={()=>props.onSelect(index)}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </SwipeableDrawer>
        </div>
    );
}