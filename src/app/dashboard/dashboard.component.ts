import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';
import { getFullname } from '../helpers';
import { AuthService } from '../services';
import { Admin, Parcel, Pickup, User } from '../models';
import { Admins, Parcels, Pickups, Users } from '../providers';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  chart:any = [];
  adminArray: Array<Admin> = [];
  shipmentArray: Array<any> = [];
  parcelArray: Array<Parcel> = [];
  pickupArray: Array<Pickup> = [];
  usersArray: Array<User> = [];
  numParcels: number;
  numPickups: number;
  numUsers: number;
  pieData: Array<number> = [];

  getFullname = getFullname;
  today = new Date().toISOString().slice(0, 10);
  todayIncome = 0;
  user: Admin;
  allDates: any;


  constructor(
    private users: Users,
    private admins: Admins,
    private parcels: Parcels,
    private pickups: Pickups,
    private authService: AuthService,
  ) {
    this.user = this.authService.getUser();
    this.getAllRecords();
    
  }

  ngOnInit() {
    this.getTodayAdmins();
    this.calculateIncome(this.parcelArray);
    this.allDates = this.parcelArray.map(parcel => {
      return new Date(parcel.createdAt).toLocaleTimeString('en', {
        year: 'numeric',
        month: 'short',
        day: "numeric"
      })
      
    });
    console.log(this.allDates);

    this.createLineChart('line', [
      {
        label: 'Parcels created',
        data:  [1, 2, 3, 6,78, 100,250 ],
        backgroundColor: '#f96332',
        borderColor: '#f96332',
        fill: false,
      },
      {
        label: 'pickup',
        data:  [ 21, 3, 43, 45, 78, 100, 250 ],
        backgroundColor: '#3e3e3e',
        borderColor: '#3e3e3e',
        fill: false,
      }
    ])

    this.createPieChart('doughnut', [{
      label: 'Parcels created',
      data:  [21, 12, 3 ],
      backgroundColor: ['#f96332', '#2CA8FF', '#18ce0fcc'],
      borderColor: '#ffffff',
      fill: false,
    },], ['pickup', 'parcel', 'Users'])

  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getParcels() {
    this.parcels.recordRetrieve().then(res => {
      if(res.success && res.payload.length > 0 ){
        this.parcelArray = res.payload;
        this.numParcels = this.parcelArray.length;
        this.pieData.push(this.numParcels);
      }
    }).catch(err => {
      console.log(err);
    })
  }
  getPickups() {
    this.pickups.recordRetrieve().then(res => {
      if(res.success && res.payload.length > 0 ){
        this.pickupArray = res.payload;
        this.numPickups = this.pickupArray.length;
        this.pieData.push(this.numPickups);
      }
    }).catch(err => {
      console.log(err);
    })
  }
  getUsers() {
    this.users.recordRetrieve().then(res => {
      if(res.success && res.payload.length > 0 ){
        this.usersArray = res.payload;
        this.numUsers = this.usersArray.length;
        this.pieData.push(this.numUsers);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  // to get data required
  getAllRecords(){
    this.getUsers();
    this.getParcels();
    this.getPickups();
  }

  calculateIncome(parcels: Array<Parcel>) {
    return parcels.reduce((acc, curr) => (
      acc + curr.costPayable
    ), 0);
  }

  getTodayAdmins() {
    this.admins.recordRetrieve(`?createdAt>${this.today}`).then(res => {
      if (res.success && res.payload.length > 0) {
        this.adminArray = res.payload;
      }
    }).catch(err => {
      console.log('Error getting admins => ', err);
    });
  }

  // checkParcel(record: any) {
  //   const findItem = this.routingChartData.find(item => item.name == record.deliveryStatus);
  //   if (findItem.length > 0) {
  //     return true;
  //     // tslint:disable-next-line:radix
  //     // findItem.value = `${parseInt(findItem.value) + 1}`;
  //   } else {
  //     return false;
  //     // this.routingChartData.push({name: record.deliveryStatus, value: `1`});
  //   }
  // }

  createLineChart(type: string, config: Array<Object>){
    this.chart = new Chart('canvas', {
      type: type,
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [...config]
      },
      options: {
				responsive: true,
				title: {
					display: true,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
    })
  }
  createPieChart(type: string, config: Array<any>, labels: Array<string>){
    
    this.chart = new Chart('pie-chart', {
      type: type,
      data: {
        labels: [...labels],
        datasets: [...config]
      },
      options: {
				responsive: true,
				title: {
					display: true,
					text: 'Pie chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
	
			}
    })
  }
}
