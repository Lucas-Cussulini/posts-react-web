import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { loadPosts } from '../../utils/load-posts';
import {Posts} from '../../components/Posts/index'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setallPosts] = useState([]);
  const [page, setPage] = useState([]);  
  const [postsPerPage] = useState([10]);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLowerCase()
    );
  }) 
  :
  posts;


  const handleLoadPosts = useCallback(async (page, postsPerPage) => {

    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setallPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    console.log('Compenente re-renderizado');
    handleLoadPosts(0, postsPerPage);
    
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    console.log("Mais posts foram chamados");

    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage)

    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage)

    posts.push(...nextPost);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {

    const { value } = e.target;

    setSearchValue(value)

  }

  return(

    <section className='container'>
      <div className="search-container">
        {!!searchValue && (
            <h1> Search value: {searchValue} </h1>
        )}
            <TextInput searchValue={searchValue} handleChange={handleChange}/>
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts =(</p>
      )}
      
      <div className='button-container'>
        {!searchValue &&(
          <Button 
            text="Carregar mais posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}

      </div>

    </section>
  );
}

// class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 10,
//     searchValue: ''
//   };

//   /**
//    * Assim que o componente montar, eu quero fazer alguma coisa - Quando fizer uma requisição para uma API
//    * passa primeiro pelo DidMount */ 
//   async componentDidMount(){
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const {page, postsPerPage} = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//        posts: postsAndPhotos.slice(page, postsPerPage),
//        allPosts: postsAndPhotos,
//        });
//   }

//   loadMorePosts = () => {
//     console.log("Mais posts foram chamados");

//     const  {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage)

//     console.log(page, postsPerPage, nextPage, nextPage + postsPerPage)

//     posts.push(...nextPost);

//     this.setState({ posts, page: nextPage});
//   }

//   handleChange = (e) => {

//     const { value } = e.target;
//     this.setState({ searchValue: value });

//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;
//     const filteredPosts = !!searchValue ? 
//     allPosts.filter(post => {
//       return post.title.toLowerCase().includes(
//         searchValue.toLowerCase()
//       );
//     }) 
//     :
//     posts;

//     return (
//       <section className='container'>
//         <div class="search-container">
//           {!!searchValue && (
//               <h1> Search value: {searchValue} </h1>
//           )}
//               <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
//         </div>

//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts}/>
//         )}

//         {filteredPosts.length === 0 && (
//           <p>Não existem posts =(</p>
//         )}
        
//         <div class='button-container'>
//           {!searchValue &&(
//             <Button 
//               text="Carregar mais posts"
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}

//         </div>

//       </section>
//     );
//   }
//   }

  export default Home;


  /**
   * 
  // Componente acaba de ser atualizado
  componentDidUpdate(){
    
  }

  // Limpa o componente quando a page é atualizada
  componentWillUnmount(){

  }
   */