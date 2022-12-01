const todoTemplate = (id, created_at, text) => 
`<div class="border mb-5 bg-white shadow-lg rounded p-4 flex flex-col justify-between leading-normal">
<p class="block text-gray-700 font-bold">Job ID:</p>
<p class="pb-2">${id}</p>
<p class="block text-gray-700 font-bold">Created At:</p>
<p class="pb-2">${created_at}</p>
<p class="block text-gray-700 font-bold">Description:</p>
<p class="pb-2">${text}</p>
</div>`

var list = document.getElementById('addjob');

function addJobs(){
    var job = document.getElementById('job').value;
    if(job == ''){
        alert('Please fill the job field');
    }
    else{
        fetch('/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              "job": job
            })
          })
            .then(r => r.json())
            .then(function(data){
              list.innerHTML = '';
              for(var i = 0; i < data.length; i++){
                list.insertAdjacentHTML('beforeend', todoTemplate(data[i].id, data[i].created_at, data[i].text));
              }       
            });
    }
    document.getElementById('job').value = '';
}
