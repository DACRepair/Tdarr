import React, { Component } from 'react';

import { ProgressBar } from 'react-bootstrap';


import ToggleButton from 'react-toggle-button'

var path = require('path')

var ButtonStyle = {
  display: 'inline-block',
}



export default class Worker extends Component {

  constructor(props) {
    super(props);
  }



  render() {



    return (
      <div className="workerContainer">
        <div className={this.props.worker.modeType == 'transcode' ? "borderStyleTranscode": this.props.worker.modeType == 'healthcheck' ? "borderStyleHealthCheck": "borderStyleGeneral"}>


  
        <div className="workerContainerItems">


      <p></p>

        <div className="workerItemsGrid">

        <div className="grid-item"  style={ButtonStyle} >
          <div style={ButtonStyle} className="toggleWorkerButton">
            <ToggleButton

              value={!this.props.worker.idle || false}
              onToggle={() => {
                Meteor.call('upsertWorkers', this.props.worker._id,{
                  idle: !this.props.worker.idle,
                }, function (error, result) { });
              }

              }
            />
          </div>
          </div>

          <div className="grid-item"  style={ButtonStyle}>
          <div style={ButtonStyle}>
      
          {this.props.worker.mode == 'transcode' ? "Transcode": this.props.worker.mode == 'healthcheck' ? "Heath check": "General("+workerModes[this.props.worker.modeType]+")"}

          </div>
          </div>



          <div className="grid-item" style={ButtonStyle}>
          <div style={ButtonStyle}>

  
<input type="button" className="cancelWorkerButton"  style={ButtonStyle} onClick={() => {


  Meteor.call('cancelWorkerItem', this.props.worker._id, function (error, result) { })


}} value="Cancel item"/>
 </div>
 </div>

 
 <div className="grid-item" style={ButtonStyle}>
          <div style={ButtonStyle}>

  
          <input type="button" className="cancelWorkerButton" style={ButtonStyle} onClick={() => {


            Meteor.call('killWorker', this.props.worker._id, this.props.worker.file, this.props.worker.mode, function (error, result) { })


          }} value="X"/>

</div>
         
           </div>
       </div>

        <p>
        {path.basename(this.props.worker.file)}
        </p>




<style type="text/css">
{`
.progressbar-custom {
  background-color: purple;
  color: white;
}
`}
  </style>



        <ProgressBar now={this.props.worker.percentage}  label={this.props.worker.percentage+"%"} variant="custom" />

<div className={this.props.worker.percentage > 100 ? '' : 'hidden'}>

        No total frame count. Frame: {this.props.worker.percentage/100 }

        </div>
        </div>
        </div>
      </div>
    );
  }
}

var workerModes = {
  healthcheck:"Health",
  transcode:"Transcode"
}