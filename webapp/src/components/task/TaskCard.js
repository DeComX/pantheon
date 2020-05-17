import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
    };
  }

  componentDidMount() {
    // load task details
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Ongoing
          </Typography>
          <Typography variant="h5" component="h2">
            Owner
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Java, Backend
          </Typography>
          <Typography variant="body" component="p">
            Price
          </Typography>
          <Typography variant="body2" component="p">
            This task is to develop a backend...
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/task/task1">Details</Link>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(withRouter(Landing));
