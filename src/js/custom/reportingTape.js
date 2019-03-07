Vue.component('report', {
    props: ['date', 'id', 'text'],
    template: `
        <div :id="id" class="report">
            <div class="date">{{ date }}</div>
            <p class="id">Отчёт #{{ id }}</p>
            <p class="text" v-html="text"></p>
            <button
                class="delete"v-on:click="$emit('remove', $event)">Удалить</button>
        </div>
    `
})

let reportingTape = new Vue({
    el: '#reporting-tape',
    data: {
        reportText: '',
        reports: [],
        i: 0
    },
    methods: {
        publishReport: function () {
            //Add the new report in massive
            this.reports.push({})
            //Add date for the report
            this.setDate()
            //Convert markup into html
            this.convertText()
            //Set id for the report
            this.setId()

            this.i++

            //Reset text in textarea
            this.reportText = ''
        },

        setId: function () {
            for (let p = 1; p <= this.reports.length; p++) {
                this.reports[p-1].id = p
            }
        },

        deleteReport: function (e) {
            //Delete report from reports array
            this.deleteFromArray(e)

            //Reset ids
            this.setId()

            this.i--
        },

        deleteFromArray: function (e) {
            let id = e.target.parentNode.getAttribute('id')

            for (let p = 0; p < this.reports.length; p++) {
                if (this.reports[p].id == id) {
                    this.reports.splice(p, 1)
                    break
                }
            }
        },

        setDate: function () {
            //Set the day of publication of the report
            let date = new Date()

            let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC'
            }

            this.reports[this.i].date = date.toLocaleString("ru", options)
        },

        convertText: function () {
            //Link converter
            let converter = new showdown.Converter()

            //Convert markup into html
            this.reports[this.i].text = converter.makeHtml(this.reportText)
        }
    }
})