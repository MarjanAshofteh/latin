<template>
   <div>
       <pre>
            {{this.errors}}
        </pre>
   </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'test',
    data(){
        return{
            errors:[]
        }
    },
    mounted() {
        console.log('asdfasdf');
        var data = {
            hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
            username_email : "test",
            password : "123456"
        }
        axios.post('http://civil808.com/latin/user/latin2',
            {
                hash : "50e185c2e0c2bc30215338db776022c92ecbc441fd933688c6bf4f274c863c60",
                username_email : "test",
                password : "123456"
            },
            {
                headers: {
                'Content-type': 'application/json',
                }
            }).then(response => console.log('yeeeeeeeeh'))
            .catch(e => {
                this.errors.push(e)
            });
    }
}
</script>


