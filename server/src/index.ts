import express from "express";
import cors from "cors";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { schemaTypeDefs } from "./schema/schema";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import { merge } from "lodash";
import { UserTypeDefs } from "./schema/typeDefs/User";
import { AuthenticateTypeDefs } from "./schema/typeDefs/Authenticate";
import { UserResolvers } from "./schema/resolvers/User";
import { AuthenticateResolvers } from "./schema/resolvers/Authenticate";
import { VideoResolvers } from "./schema/resolvers/Video";
import { VideoTypeDefs } from "./schema/typeDefs/Video";
import { join } from "path";
import { CommentTypeDefs } from "./schema/typeDefs/Comment";
import { CommentResolvers } from "./schema/resolvers/Comment";

require("dotenv").config();

async function startApolloServer() {
	const app = express();

	const typeDefs = [schemaTypeDefs, UserTypeDefs, AuthenticateTypeDefs, VideoTypeDefs, CommentTypeDefs];
	const resolvers = merge(UserResolvers, AuthenticateResolvers, VideoResolvers, CommentResolvers);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context({ req, res }): ExpressContext {
			return {
				req,
				res
			}
		}
	});

	await server.start().catch(err => console.error(err));
	
	await connect("mongodb://localhost:27017/vidtube", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => console.log ("MongoDB Connected!"))
	.catch(err => console.error(err));

	app.use(cookieParser());

	app.use(cors({
		origin: "http://localhost:3000",
		credentials: true
	}));

	app.get("/video/:filename", (req, res) => {
		res.sendFile(join(__dirname, "assets/", req.params.filename));
	});

	server.applyMiddleware({ app, cors: false });

	const port = process.env.PORT || 5000;

	app.listen(port, (): void => {
		console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
	});

	return { server, app };
}

startApolloServer();