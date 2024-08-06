<template>
    <q-page>
      <div class="row justify-center">
        <div class="col-10">
          <h4 class="text-center q-my-md">Poll Results</h4>
          <p>Select a school to show what jobs students are interested in. Select "all NYC schools" to see how many students/schools have participated.</p>
          <q-select
          outlined
          v-model="selectedSchool"
          :options="displayList"
          label="select a NYC high school"
          option-value="SchoolID"
          option-label="SchoolName"
          use-input
          input-debounce="0"
          @filter="filterSchool"
          clearable
          class="q-mb-md"
        >
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            style="background: white;"
          >
            <q-item-section>
              <q-item-label lines="1">
                {{ scope.opt.SchoolName }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:no-option>
          <q-item>
              <q-item-section class="text-grey">
              No results
              </q-item-section>
          </q-item>
          </template>
        </q-select>
        <div v-if="recordsFound">
            <GChart type="BarChart" :data="chartData" :options="chartOptions" :style="chartStyle" />
            <q-inner-loading :showing="loading">
                <q-spinner-gears size="50px" color="primary" />
                <h6 class="q-ma-none q-mt-md">loading data...</h6>
            </q-inner-loading>
        </div>
        <div v-if="!recordsFound" style="width: 100%; height:300px;" class="relative-position" >
            <p class="absolute-center text-blue">no records found!</p>
        </div>
   
        </div>
      </div>
      </q-page>
    </template>
    
     <script>
     import { GChart } from 'vue-google-charts'
     export default {
      components: {
        GChart
      },
      data() {
        return {
          loading: false,
          recordsFound: true,
          selectedSchool: null,
          schoolList: [],
          displayList: [],
          chartOptions: {
              backgroundColor: 'transparent',
              legend: { position: 'none' },
              hAxis: { title: 'Students', format: '0' },
              chartArea: { left: 540, top: 10, width: '100%' }
          },
          chartStyle: 'height: calc(70vh)',
          chartData: []
        }
      },
      watch: {
          selectedSchool() {
              this.loadPollResults()
          }
      },
      methods: {
          filterSchool(val, update){
              if (val === '') {
                  update(() => {
                      this.displayList = this.schoolList
                  })
                  return
              }
              update(() => {
                  const needle = val.toLowerCase()
                  this.displayList = this.schoolList.filter(rec => rec.SchoolName.toLowerCase().indexOf(needle) > -1)
              })
          },
          loadPollResults(){
              this.loading = true
              const data = {
                  SchoolID: this.selectedSchool === null ? null : this.selectedSchool.SchoolID
              }
              fetch(process.env.SERVER_URL + '/api/results',{
                  method: 'POST',
                  headers: {
                      Accept: 'application.json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              })
              .then(response => response.json())
              .then(data => {
                  this.loading = false
                  this.recordsFound = data.length > 0
                  let chartData = []
                  if(this.selectedSchool === null || this.selectedSchool.SchoolID === null){
                      chartData.push(['School', 'Students', { role: 'style' }])
                  for (const rec of data) {
                      chartData.push([
                      rec.SchoolName,
                      parseInt(rec.studentCount),
                      '#009900'
                      ])
                  }
                  this.chartData = chartData
                  }else{
                      chartData.push(['Job Title', 'Students', { role: 'style' }])
                  for (const rec of data) {
                      chartData.push([
                      rec.JobTitle,
                      parseInt(rec.studentCount),
                      '#0000FF'
                      ])
                  }
                  this.chartData = chartData
                  }
              })
          }
      },
      mounted() {
          // load school list for select drop down box
          fetch(process.env.SERVER_URL + '/api/school-list')
          .then(response => response.json())
          .then(schoolList => {
              this.schoolList = [{SchoolID: null, SchoolName: 'all NYC schools'}].concat(schoolList)
              this.displayList = this.schoolList
              this.selectedSchool = {
                  SchoolID: null,
                  SchoolName: 'all NYC schools'
              }
          })
      }
     }
     </script>