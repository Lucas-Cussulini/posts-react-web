export const loadPosts = async () => {

    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');

    const phothosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postResponse, phothosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });

    return postsAndPhotos;
}