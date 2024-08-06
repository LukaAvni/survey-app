<template>
    <div>
      <h3 class="gt-sm text-center q-my-md">Pick your favorite job</h3>
      <h5 class="lt-md text-center q-my-md">Pick your favorite job</h5>
      <div class="row">
        <div class="col-8" style="margin:auto;">
          <q-card v-if="windowHeight > 700">
            <q-card-section>
              <p>Below is the list of {{ jobTitles.length }} in-demand jobs in New York City. Pick your favorite job.</p>
             
              <p><span class="text-bold">Your privacy:</span>
              This is an anonymous poll. Your name will not be visible to others. You can change your choice at any time.</p>
             
              <p class="q-mb-none"><span class="text-bold">SAVE your choice: </span>Scroll through the list. Make a selection, then save your choice.</p>
             
            </q-card-section>
          </q-card>
          <q-card class="q-mt-sm">
            <q-card-section>
              <div class="q-py-md">
                <q-select outlined v-model="sort" :options="options" label="Sort" />
              </div>
              <q-list bordered separator :style="cardHeight" class="overflow-auto">
                <q-item v-for="(jobTitle, idx) in jobTitles" :key="idx">
                  <q-item-section avatar>
                    <q-radio v-model="selected" :val="jobTitle.JobTitle" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-bold">{{ jobTitle.JobTitle }}</q-item-label>
                    <q-item-label lines="4">Job Openings: {{ jobTitle.JobCount }} | Employers: {{ jobTitle.EmployerCount
                    }} |
                      Avg Annual Wage: ${{ jobTitle.AvgAnnualWage.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                      }} | required education: <span class="text-bold"
                        :class="jobTitle.RequiredEducation === 'mostly college' ? 'text-red' : 'text-blue'">{{
                            jobTitle.RequiredEducation
                        }}</span></q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-separator dark />
            <q-card-actions align="around">
              <q-btn color="green" @click="saveChoice">Save your choice</q-btn>
              <q-btn v-if="saved" color="blue" :to="{ name: 'Results' }">Show poll results</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
   </template>
   <script>
   export default {
    data() {
      return {
        error: false,
        saved: false,
        user: null,
        id: null,
        jobTitles: [],
        selected: null,
        options: ['title', 'jobs', 'employers', 'wage'],
        sort: 'title'
      }
    },
    computed: {
      windowHeight () {
        return window.innerHeight
      },
      cardHeight () {
        return window.innerHeight > 700 ? 'height: calc(100vh - 450px);' : 'height: calc(100vh - 270px);'
      }
    },
    watch: {
      sort() {
        this.sortJobTitles(this.jobTitles)
      }
    },
    methods: {
      sortJobTitles(jobTitles) {
        this.jobTitles = jobTitles.sort((a, b) => {
          switch (this.sort) {
            case 'title':
              if (a.JobTitle > b.JobTitle) return 1;
              if (a.JobTitle < b.JobTitle) return -1;
              return 0
              break
            case 'jobs':
              if (a.JobCount < b.JobCount) return 1;
              if (a.JobCount > b.JobCount) return -1;
              return 0
              break
            case 'employers':
              if (a.EmployerCount < b.EmployerCount) return 1;
              if (a.EmployerCount > b.EmployerCount) return -1;
              return 0
              break
            case 'wage':
              if (a.AvgAnnualWage < b.AvgAnnualWage) return 1;
              if (a.AvgAnnualWage > b.AvgAnnualWage) return -1;
              return 0
              break
  
          }
        })
      },
      async saveChoice() {
        const data = {
          email: this.user,
          SchoolID: this.id,
          JobTitle: this.selected,
          CreatorEmail: process.env.CREATOR_EMAIL
        }
        const result = await fetch(process.env.SERVER_URL + '/api/survey', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(() => {
            this.saved = true
           this.$q.notify({
            message: 'Your choice has been recorded. Thank you!',
            color: 'positive'
           })
          })
      }
    },
    mounted() {
      if (typeof this.$route.query.user !== 'undefined' && typeof this.$route.query.id !== 'undefined') {
        this.user = this.$route.query.user
        this.id = this.$route.query.id
        fetch(process.env.SERVER_URL + '/api/joblist')
          .then(response => response.json())
          .then(jobTitles => {
            this.sortJobTitles(jobTitles)
          })
      }
    }
   }
   </script>