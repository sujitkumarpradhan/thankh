import React, { Component, PropTypes } from "react";
import "./Presentation.css";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { GridLoader } from "react-spinners";
import { confirmAlert } from "react-confirm-alert";

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

class clonePresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // base64: "",
      loading: true,
      designerID: null
    };

    this.clonePresentationHandle = this.clonePresentationHandle.bind(this);
  }

  // Used for accidental close of the tab as it take time to clone

  onUnload = e => {
    e.preventDefault();
    e.returnValue = "";
  };

  componentDidMount() {
    if (
      this.props.location.state == undefined ||
      this.props.location.state == "" ||
      this.props.location.state == null
    ) {
      this.props.history.push("/");
    }
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  // Main cloning function

  async clonePresentationHandle(
    listAdvertisers,
    data,
    createAdvertiser,
    createDestination,
    createStore,
    addCreatives,
    addLandingPage
  ) {
    // console.log("Alter1============", data.LandingPage);

    // Cloning function to createAdvertiser
    let result = await createAdvertiser({
      variables: {
        name: data.name,
        landingPageURL: data.landingPageURL,
        designersAlias: data.designersAlias,
        locale: data.locale,
        sfURL: data.sfURL,
        createdAt: new Date().toGMTString(),
        version: listAdvertisers.items.length + 1,
        gateway: data.gateway,
        event: data.event,
        contextual: data.contextual,
        MajorEvent: data.MajorEvent,
        lastModified: new Date().toGMTString(),
        mGateway: data.mGateway,
        mEvent: data.mEvent,
        mContextual: data.mContextual,
        lp: data.lp,
        fireTablet: data.fireTablet,
        fireTv: data.fireTv,
        Store: data.Store,
        Destination: data.destination,
        BannerCarousel: data.BannerCarousel,
        FireTablet: data.fireTablet
      }
    });

    if (result.data.createAdvertiser.id) {
      // Cloning function to Destination
      const dest = [];
      for (var i = 0; i < data.Destination.items.length; i++) {
        let resultDes = await createDestination({
          variables: {
            DestinationURLMain: data.Destination.items[i].DestinationURLMain
              ? data.Destination.items[i].DestinationURLMain
              : null,
            DestinationURLBackup: data.Destination.items[i].DestinationURLBackup
              ? data.Destination.items[i].DestinationURLBackup
              : null,
            DestinationFTV: data.Destination.items[i].DestinationFTV
              ? data.Destination.items[i].DestinationFTV
              : null,
            DestintaionFT: data.Destination.items[i].DestintaionFT
              ? data.Destination.items[i].DestintaionFT
              : null,
            CreativeVersion: data.Destination.items[i].CreativeVersion
              ? data.Destination.items[i].CreativeVersion
              : null,
            AdvertiserID: result.data.createAdvertiser.id
          }
        });

        dest.push(resultDes.data);
      }

      // Cloning function to Store
      // for (var i = data.Store.items.length - 1; i >= 0; i--) {
      for (var i = 0; i < data.Store.items.length; i++) {
        await createStore({
          variables: {
            DestinationURLMain: data.Store.items[i].DestinationURLMain
              ? data.Store.items[i].DestinationURLMain
              : null,
            AdvertiserID: result.data.createAdvertiser.id,
            PreviewLink: data.Store.items[i].PreviewLink
              ? data.Store.items[i].PreviewLink
              : null,
            Password: data.Store.items[i].Password
              ? data.Store.items[i].Password
              : null,
            SfURL: data.Store.items[i].SfURL ? data.Store.items[i].SfURL : null,
            Designer: data.Store.items[i].Designer
              ? data.Store.items[i].Designer
              : null,
            CreatedBy: data.Store.items[i].CreatedBy
              ? data.Store.items[i].CreatedBy
              : null,
            Approval: null,
            CreatedDate: new Date().toGMTString(),
            DestinationID: data.Store.items[i].DestinationID
              ? data.Store.items[i].DestinationID
              : null,
            StoreImg: data.Store.items[i].StoreImg
              ? data.Store.items[i].StoreImg
              : null
          }
        });
      }

      // Cloning function to LandingPage
      // for (var i = data.LandingPage.items.length - 1; i >= 0; i--) {
      for (var i = 0; i < data.LandingPage.items.length; i++) {
        await addLandingPage({
          variables: {
            Approval: null,
            CreatedBy: data.LandingPage.items[i].CreatedBy
              ? data.LandingPage.items[i].CreatedBy
              : null,
            CreatedDate: new Date().toGMTString(),
            Designer: data.LandingPage.items[i].Designer
              ? data.LandingPage.items[i].Designer
              : null,
            AdvertiserID: result.data.createAdvertiser.id,
            DestinationID: data.LandingPage.items[i].DestinationID
              ? data.LandingPage.items[i].DestinationID
              : null,
            PreviewLink: data.LandingPage.items[i].PreviewLink
              ? data.LandingPage.items[i].PreviewLink
              : null,
            SfURL: data.LandingPage.items[i].SfURL
              ? data.LandingPage.items[i].SfURL
              : null,
            DesktopImg: data.LandingPage.items[i].DesktopImg
              ? data.LandingPage.items[i].DesktopImg
              : null,
            TabletImg: data.LandingPage.items[i].TabletImg
              ? data.LandingPage.items[i].TabletImg
              : null,
            MobileImg: data.LandingPage.items[i].MobileImg
              ? data.LandingPage.items[i].MobileImg
              : null
          }
        });
      }

      // Cloning function to BannerCarousel
      for (var i = 0; i < data.BannerCarousel.items.length; i++) {
        var temp;
        for (var j = 0; j < dest.length; j++) {
          if (
            data.BannerCarousel.items[i].CreativeVersion ==
            dest[j].Destination.CreativeVersion
          ) {
            temp = dest[j].Destination.id;
            break;
          }
        }
        await addCreatives({
          variables: {
            AdvertiserID: result.data.createAdvertiser.id,
            Placement: data.BannerCarousel.items[i].Placement
              ? data.BannerCarousel.items[i].Placement
              : null,
            Platform: data.BannerCarousel.items[i].Platform
              ? data.BannerCarousel.items[i].Platform
              : null,
            Width: data.BannerCarousel.items[i].Width
              ? data.BannerCarousel.items[i].Width
              : null,
            ASIN: data.BannerCarousel.items[i].ASIN
              ? data.BannerCarousel.items[i].ASIN
              : null,
            Height: data.BannerCarousel.items[i].Height
              ? data.BannerCarousel.items[i].Height
              : null,
            SrcMain: data.BannerCarousel.items[i].SrcMain
              ? data.BannerCarousel.items[i].SrcMain
              : null,
            ApprovalMain: null,
            CommentMain: null,
            SrcBackup: data.BannerCarousel.items[i].SrcBackup
              ? data.BannerCarousel.items[i].SrcBackup
              : null,
            ApprovalBackup: null,
            CommentBackup: null,
            CreatedDate: new Date().toGMTString(),
            CreativeVersion: data.BannerCarousel.items[i].CreativeVersion
              ? data.BannerCarousel.items[i].CreativeVersion
              : null,
            DestinationID: temp ? temp : null,
            contentType: data.BannerCarousel.items[i].contentType
              ? data.BannerCarousel.items[i].contentType
              : null
          }
        });
      }

      // redirection to the clone page
      var name = data.name;
      var itemID = result.data.createAdvertiser.id;
      var MajorEvent = data.MajorEvent;
      var sfUrl = data.sfURL;

      this.props.history.push(
        `/presentation/Desktop/${name}/${itemID}/${MajorEvent}/${sfUrl.replace(
          "https://ams-amazon.my.salesforce.com/",
          ""
        )}`
      );
    } else {
      // redirection to the home page if error in advertiser creation
      confirmAlert({
        title: "Error occurred while cloning",
        message:
          "Please reach out to Yuvika (yuvikoul) or Sujit (sujpradh) for more details",
        buttons: [
          {
            label: "Ok",
            onClick: () => {
              this.props.history.push({
                pathname: `/`
              });
            }
          }
        ]
      });
    }

    // if (result.data.createAdvertiser.id) {

    // } else {

    // }
  }

  render() {
    return (
      <div>
        <Mutation
          mutation={gql`
            mutation CreateLandingPage(
              $AdvertiserID: ID!
              $CreatedDate: String
              $CreatedBy: String
              $DesktopImg: String
              $TabletImg: String
              $MobileImg: String
              $PreviewLink: String
              $SfURL: String
              $Approval: String
              $DestinationID: ID
            ) {
              createLandingPage(
                input: {
                  AdvertiserID: $AdvertiserID
                  CreatedDate: $CreatedDate
                  CreatedBy: $CreatedBy
                  DesktopImg: $DesktopImg
                  TabletImg: $TabletImg
                  MobileImg: $MobileImg
                  PreviewLink: $PreviewLink
                  SfURL: $SfURL
                  Approval: $Approval
                  DestinationID: $DestinationID
                }
              ) {
                id
              }
            }
          `}
        >
          {(addLandingPage, { loading, data }) => {
            return (
              <Mutation
                mutation={gql`
                  mutation createBannerCarousel(
                    $AdvertiserID: ID!
                    $Placement: String!
                    $Platform: String!
                    $Width: Int!
                    $ASIN: Int
                    $Height: Int!
                    $SrcMain: String
                    $ApprovalMain: String
                    $CommentMain: String
                    $SrcBackup: String
                    $ApprovalBackup: String
                    $CommentBackup: String
                    $CreatedDate: String
                    $CreativeVersion: Int
                    $DestinationID: ID
                    $contentType: String
                  ) {
                    createBannerCarousel(
                      input: {
                        AdvertiserID: $AdvertiserID
                        Placement: $Placement
                        Platform: $Platform
                        Width: $Width
                        ASIN: $ASIN
                        Height: $Height
                        SrcMain: $SrcMain
                        ApprovalMain: $ApprovalMain
                        CommentMain: $CommentMain
                        SrcBackup: $SrcBackup
                        ApprovalBackup: $ApprovalBackup
                        CommentBackup: $CommentBackup
                        CreatedDate: $CreatedDate
                        CreativeVersion: $CreativeVersion
                        DestinationID: $DestinationID
                        contentType: $contentType
                      }
                    ) {
                      id
                    }
                  }
                `}
              >
                {(addCreatives, { loading, data }) => {
                  return (
                    <Mutation
                      mutation={gql`
                        mutation createStore(
                          $AdvertiserID: ID!
                          $PreviewLink: String
                          $Password: String
                          $SfURL: String
                          $Designer: String
                          $CreatedBy: String
                          $Approval: String
                          $CreatedDate: String
                          $DestinationID: ID
                          $StoreImg: String
                        ) {
                          createStore(
                            input: {
                              AdvertiserID: $AdvertiserID
                              PreviewLink: $PreviewLink
                              Password: $Password
                              SfURL: $SfURL
                              Designer: $Designer
                              CreatedBy: $CreatedBy
                              Approval: $Approval
                              CreatedDate: $CreatedDate
                              DestinationID: $DestinationID
                              StoreImg: $StoreImg
                            }
                          ) {
                            id
                          }
                        }
                      `}
                    >
                      {(createStore, { loading, data }) => {
                        return (
                          <Mutation
                            mutation={gql`
                              mutation CreateDestination(
                                $DestinationURLMain: String
                                $DestinationURLBackup: String
                                $DestinationLandingpage: String
                                $DestinationFTV: String
                                $DestintaionFT: String
                                $CreativeVersion: Int!
                                $AdvertiserID: ID!
                              ) {
                                Destination: createDestination(
                                  input: {
                                    DestinationURLMain: $DestinationURLMain
                                    DestinationURLBackup: $DestinationURLBackup
                                    DestinationLandingpage: $DestinationLandingpage
                                    DestinationFTV: $DestinationFTV
                                    DestintaionFT: $DestintaionFT
                                    CreativeVersion: $CreativeVersion
                                    AdvertiserID: $AdvertiserID
                                  }
                                ) {
                                  id
                                  CreativeVersion
                                }
                              }
                            `}
                          >
                            {(createDestinationURL, { loading, data }) => {
                              return (
                                <Mutation
                                  mutation={gql`
                                    mutation createAdvertiser(
                                      $name: String!
                                      $landingPageURL: String
                                      $designersAlias: String!
                                      $locale: String!
                                      $sfURL: String!
                                      $createdAt: String!
                                      $version: Int!
                                      $gateway: Boolean
                                      $event: Boolean
                                      $contextual: Boolean
                                      $MajorEvent: String!
                                      $lastModified: String!
                                      $mGateway: Boolean
                                      $mEvent: Boolean
                                      $mContextual: Boolean
                                      $lp: Boolean
                                      $fireTablet: Boolean
                                      $fireTv: Boolean
                                    ) {
                                      createAdvertiser(
                                        input: {
                                          name: $name
                                          landingPageURL: $landingPageURL
                                          designersAlias: $designersAlias
                                          locale: $locale
                                          sfURL: $sfURL
                                          createdAt: $createdAt
                                          version: $version
                                          gateway: $gateway
                                          event: $event
                                          contextual: $contextual
                                          MajorEvent: $MajorEvent
                                          lastModified: $lastModified
                                          mGateway: $mGateway
                                          mEvent: $mEvent
                                          mContextual: $mContextual
                                          lp: $lp
                                          fireTablet: $fireTablet
                                          fireTv: $fireTv
                                        }
                                      ) {
                                        id
                                      }
                                    }
                                  `}
                                >
                                  {(
                                    createAdvertiser,
                                    { loading, error, data }
                                  ) => {
                                    if (!data && !loading) {
                                      return (
                                        <Query
                                          query={Filter_Advertisers}
                                          variables={{
                                            sfURL: this.props.location.state
                                              ? this.props.location.state.data
                                                  .sfURL
                                              : null
                                          }}
                                        >
                                          {({
                                            loading,
                                            error,
                                            data,
                                            getAdvertiser
                                          }) => {
                                            if (error) {
                                              console.log(error);
                                              return (
                                                <div>Some error occurred.</div>
                                              );
                                            }

                                            if (loading) {
                                              return (
                                                <div>
                                                  <div className="loaderMain sweet-loading">
                                                    <GridLoader
                                                      className="override"
                                                      sizeUnit={"px"}
                                                      size={40}
                                                      color="#8eb7e8"
                                                      loading={
                                                        this.state.loading
                                                      }
                                                    />
                                                  </div>
                                                  <div className="clonePresentationText">
                                                    Please wait... Donot refresh
                                                    or close the tab
                                                  </div>
                                                </div>
                                              );
                                            }

                                            if (data) {
                                              this.clonePresentationHandle(
                                                data.listAdvertisers,
                                                this.props.location.state.data,
                                                createAdvertiser,
                                                createDestinationURL,
                                                createStore,
                                                addCreatives,
                                                addLandingPage
                                              );
                                            }

                                            return (
                                              <div>
                                                <div className="loaderMain sweet-loading">
                                                  <GridLoader
                                                    className="override"
                                                    sizeUnit={"px"}
                                                    size={40}
                                                    color="#8eb7e8"
                                                    loading={this.state.loading}
                                                  />
                                                </div>
                                                <div className="clonePresentationText">
                                                  Please wait... Donot refresh
                                                  or close the tab
                                                </div>
                                              </div>
                                            );
                                          }}
                                        </Query>
                                      );
                                    }
                                    return (
                                      <div>
                                        <div className="loaderMain sweet-loading">
                                          <GridLoader
                                            className="override"
                                            sizeUnit={"px"}
                                            size={40}
                                            color="#8eb7e8"
                                            loading={this.state.loading}
                                          />
                                        </div>
                                        <div className="clonePresentationText">
                                          Please wait... Donot refresh or close
                                          the tab
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Mutation>
                              );
                            }}
                          </Mutation>
                        );
                      }}
                    </Mutation>
                  );
                }}
              </Mutation>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default clonePresentation;
