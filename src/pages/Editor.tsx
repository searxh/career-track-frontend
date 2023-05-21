//import { UserContext } from "App";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
//import { useContext, useRef } from "react";
//import { useHistory } from "react-router-dom";

const Editor: React.FC = () => {
  /*const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handlePublishArticle = () => {
    const fetchConfig: { [key: string]: any } = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${user?.token}`,
      },
      body: {
        article: {
          tagList: [],
        },
      },
    };
    if (titleRef.current?.value) fetchConfig.body.article.title = titleRef.current?.value;
    if (descriptionRef?.current?.value) fetchConfig.body.article.description = descriptionRef.current.value;
    if (bodyRef?.current?.value) fetchConfig.body.article.body = bodyRef.current.value;
    fetchConfig.body = JSON.stringify(fetchConfig.body);
    console.log(fetchConfig);
    fetch(`http://localhost:3000/api/articles`, fetchConfig)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.article) {
          history.push(`/${data.article.slug}`);
        } else if (data.message === "Unauthorized") {
          setUser(undefined);
          sessionStorage.removeItem("user");
        }
      });
  };*/

  return (
    <>
      <Navbar />

      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      //ref={titleRef}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      //ref={descriptionRef}
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      //ref={bodyRef}
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="Enter tags" />
                    <div className="tag-list" />
                  </fieldset>
                  <button
                    /*onClick={e => {
                      e.preventDefault();
                      handlePublishArticle();
                    }}*/
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Editor;
