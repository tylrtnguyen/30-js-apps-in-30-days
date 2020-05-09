// Instatiate classes
const github = new GitHub;
const uiManager = new UIManager;

const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
    // Get input text
    const userText  = e.target.value;
    if(userText !== ''){
        github.getUser(userText)
        .then(data => {
            if(data.profile.message === 'Not Found'){
                uiManager.showAlert('User not found', 'alert alert-danger')
            } else {
                // Show Profile
                uiManager.showProfile(data.profile)
                // Show Repos
                uiManager.showRepos(data.repos)
            }
        }) 
    } else {
        // Clear profile
        uiManager.clearProfile();
    }
})