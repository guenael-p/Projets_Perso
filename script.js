const accessKey = 'HzR3ntPhE_9p4dI6OYjkZ9S3h8WErXOYsvziBVkFF9M';
const query = '3d render';

fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`)
  .then(response => response.json())
  .then(data => {
    const imageUrl = data.results[0].urls.regular;
    document.getElementById('monImage').src = imageUrl;
});
