class UIManager {
    constructor(){
        this.profile = document.getElementById('profile');
    }

    showProfile(user) { 
        console.log(user)
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src=${user.avatar_url}>
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-info">Followers: ${user.followers}</span>
                        <span class="badge badge-success">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3"><b>Latest Repos</b></h3>
            <div id="repos"></div>
        `
    }

    showRepos(repos){
        let output = ``;
        repos.forEach(repo => {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-6">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <span class="badge badge-warning">Language: ${repo.language}</span>
                            <span class="badge badge-secondary">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-info">Forks: ${repo.forks_count}</span>
                            <span class="badge badge-success">Size: ${repo.size}KB</span>
                        </div>
                    </div>
                </div>
            `
        })
        // Output the repos
        document.getElementById('repos').innerHTML = output
    }

    // Clear found profile
    clearProfile() {
        this.profile.innerHTML = '';
    }
    
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }
    // Show alert
    showAlert(message, className) {
        // Clear remaining alert
        this.clearAlert();
        // create div
        const div = document.createElement('div');
        // Add classes
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message))
        // Get parent
        const container = document.querySelector('.searchContainer');
        // Insert alert
        const search = document.querySelector('.search');
        // Insert alert
        container.insertBefore(div, search)

        // Timeout after 3 seconds
        setTimeout(() => {
            this.clearAlert();
        },3000)
    }
}