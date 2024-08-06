<template>
    <div>
      <div style="width:100%; max-height:300px;overflow: hidden;">
        <q-img src="~assets/BAHS-CS-class-2023-12-19.jpg" />
      </div>
      <div class="row text-center">
        <div class="col-12 col-md-4">
            <div class="row">
              <div class="col">
                <q-img src="~assets/BAHS-logo.png" width="80%" />
                <p class="q-px-sm">Bronx Aerospace High School</p>
              </div>
              <div class="col">
                <p class="q-ma-none q-mt-md">created by:</p>
              <p class="q-mb-none text-bold">{{ creatorName }}</p>
              <p class="q-mb-md">visit me on <a :href="linkedIn"
                  target="_blank">LinkedIn</a></p>
              <q-img
   src="~assets/luka-pic.jpg"
                style="border-radius:50%;" width="50%" />
              </div>
            </div>
        </div>
        <div class="col-12 col-md-8">
          <h2 class="gt-sm text-center q-my-md">NYC Job Interest Survey</h2>
          <h3 class="lt-md text-center q-my-md">NYC Job Interest Survey</h3>
          <div class="container">
            <p class="text-left">Welcome to the job interest survey!
              The purpose of this survey is to obtain information about what job you may be interested interested when you
              enter your work life. <span class="text-bold">This poll is anonymous.</span></p>
  
  
              <q-select
                outlined
                v-model="selectedSchool"
                :options="displayList"
                label="select your high school"
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
  
  
  
            <div class="row">
              <q-input outlined v-model="email" label="enter your email address" style="width:80%" @focus="error = false" @keyup.enter="go"/>
              <q-btn color="primary" class="q-ml-md" @click="go">Go</q-btn>
            </div>
            <p v-if="schoolError" class="text-red text-bold">Please select your school.</p>
            <p v-if="emailError" class="text-red text-bold">Email address is invalid.</p>
          </div>
        </div>
      </div>
    </div>
   </template>
  
   <script>
   export default {
    data() {
      return {
        email: '',
        emailError: false,
        schoolError: false,
        loading: false,
        selectedSchool: null,
        schoolList: [],
        displayList: [],
  
      }
    },
    watch: {
      selectedSchool() {
        if(this.selectedSchool !== null){
          this.schoolError = false
        }
      },
      email() {
        if(this.email.length > 0){
          this.emailError = false
        }
      }
    },
    computed: {
      creatorName () {
        return process.env.CREATOR_NAME
      },
      linkedIn () {
        return process.env.LINKEDIN
      },
      linkedIn_pic () {
        return process.env.LINKEDIN_PIC
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
      go() {
        if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(this.email)) {
          if(this.selectedSchool !== null ){
            this.$router.push({ name: 'Survey', query: { user: this.email, id: this.selectedSchool.SchoolID } })
          }else{
            this.schoolError = true
          }
        } else {
          this.emailError = true
        }
      }
    },
    mounted() {
        // load school list for select drop down box
        fetch(process.env.SERVER_URL + '/api/school-list')
        .then(response => response.json())
        .then(schoolList => {
            this.schoolList = schoolList
            this.displayList = this.schoolList
        })
    }
   }
   </script>
  
   <style>
   .container {
    width: 70%;
    margin: auto;
   }
   </style>