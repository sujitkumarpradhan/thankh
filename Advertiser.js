import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./Advertiser.css";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

const Filter_Advertisers = gql`
  query ListAdvertisers($sfURL: String!) {
    listAdvertisers(filter: { sfURL: { contains: $sfURL } }) {
      items {
        id
        sfURL
        version
      }
    }
  }
`;

const AdvertiserItem = ({ children, item, onDelete }) => {
  return (
    <div className="ListItemWrapper">
      <ul>
        <Link
          to={`/presentation/${item.name}/${item.id}/${item.MajorEvent}`}
          className="ListItem"
        >
          {children}
        </Link>
      </ul>
    </div>
  );
};

const AdvertiserList = ({ children }) => {
  return <div className="AdvertiserList">{children}</div>;
};

class AddAdvertiser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      designersAlias: null,
      locale: "",
      event: "",
      version: 1,
      buttonClicked: false,
      error: false
    };
  }

  render() {
    const { onAdd, loading } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <div className="CreateForm">
            <div className="CreateTitle">Create new presentation</div>
            <div>
              <label className="CreateLabel">
                <input
                  className="CreateInput"
                  placeholder="Salesforce URL"
                  type="text"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </label>
            </div>
            <button
              className="AddAdvertiser"
              onClick={async () => {
                await this.setState({
                  buttonClicked: true
                });
                if (this.state.name === "" || this.state.name === null) {
                  onAdd({
                    error: "Salesforce URL cannot be empty"
                  });
                  this.setState({
                    buttonClicked: false
                  });
                } else {
                  let response = await fetch(
                    `http://adinfoprovider.corp.amazon.com/getSalesforceDetails`,
                    {
                      method: "POST",
                      body: JSON.stringify({
                        assignmentId: this.state.name
                      })
                    }
                  );
                  console.log("respnse: ", response.assignmentType);

                  if (response.status === 200) {
                    response.json().then(async response => {
                      let aliasToFetch = null;

                      if (response.assignmentType === "Trafficking") {
                        aliasToFetch = JSON.parse(response.rawData)
                          .CM_CPM_TAM_Trafficker__c;
                        console.log("alias:", aliasToFetch);
                      } else if (
                        JSON.parse(response.rawData).Designer__c === null
                      ) {
                        aliasToFetch = JSON.parse(response.rawData)
                          .CM_CPM_TAM_Trafficker__c;
                        console.log("alias:", aliasToFetch);
                      } else {
                        aliasToFetch = JSON.parse(response.rawData).Designer__c;
                        console.log(
                          "Designer:",
                          JSON.parse(response.rawData).Designer__c
                        );
                      }
                      if (aliasToFetch != null) {
                        let designer = await fetch(
                          `http://adinfoprovider.corp.amazon.com/getSalesforceUserDetails`,
                          {
                            method: "POST",
                            body: JSON.stringify({
                              userId: aliasToFetch
                            })
                          }
                        );
                        console.log("user details:", designer);
                        designer.json().then(async designer => {
                          console.log(
                            "sf response: ",
                            JSON.parse(response.rawData)
                          );
                          if (
                            JSON.parse(response.rawData).Major_Event__c === null
                          ) {
                            onAdd({
                              error:
                                "This assignment is not tagged to a major event"
                            });
                            this.setState({
                              buttonClicked: false
                            });
                          } else {
                            const { data } = await client.query({
                              query: Filter_Advertisers,
                              variables: {
                                sfURL: this.state.name
                              }
                            });

                            onAdd({
                              name: `${response.name.replace(
                                "Assignment - ",
                                ""
                              )} ${JSON.parse(
                                response.rawData
                              ).Advertiser__c.replace(
                                /[&\/\\#,+()$~%.'":*?<>{}]/g,
                                "_"
                              )}`,
                              version: data.listAdvertisers.items.length + 1,
                              sfURL: this.state.name,
                              designersAlias: designer.alias,
                              createdAt: new Date().toGMTString(),
                              locale: response.list[0].locale,
                              MajorEvent: JSON.parse(response.rawData)
                                .Major_Event__c,
                              status: response.status,
                              error: null
                            }).then(
                              this.setState({
                                name: "",
                                locale: "",
                                designersAlias: "",
                                event: "",
                                version: 1,
                                buttonClicked: false
                              })
                            );
                          }
                        });
                      } else if (aliasToFetch === null) {
                        onAdd({
                          error:
                            "Please make sure that a CMM or a Designer is tagged in this assignment"
                        });
                        this.setState({
                          buttonClicked: false
                        });
                      } else {
                        onAdd({
                          error:
                            "Please make sure that CMM or a Designer is tagged in this assignment"
                        });
                        this.setState({
                          buttonClicked: false
                        });
                      }
                    });
                  } else if (response.status != 200) {
                    onAdd({
                      error:
                        "Please input the correct salesforce URL or retry if it is indeed a salesforce url"
                    });
                    this.setState({
                      buttonClicked: false
                    });
                  }
                }
              }}
              disabled={loading || this.state.buttonClicked}
            >
              {loading || this.state.buttonClicked
                ? "Processing..."
                : "Continue"}
            </button>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export { AdvertiserList, AdvertiserItem, AddAdvertiser };
const styles = {
  icon: {
    color: "#669fd5",
    fontSize: "12px",
    paddingLeft: "12px",
    paddingBottom: "2px"
  },
  buttonDelete: {
    position: "relative",
    cursor: "pointer",
    fontSize: 14,
    color: "#1b799a",

    background: "none",
    border: "none"
  }
};
