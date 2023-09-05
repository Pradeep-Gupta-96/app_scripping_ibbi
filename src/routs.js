import express from "express";
import {
    auction_notices,
    claims,
    drat,
    drts,
    high_court,
    ibbi,
    ipa_rvo,
    nclat,
    nclt,
    orders,
    other_courts,
    public_announcement,
    resolution_plans,
    summary_of_outcomes,
    supreme_court
} from "./controllers.js";

export const routes = express.Router()

routes.get('/public_announcement', public_announcement)
routes.get('/claims', claims)
routes.get('/resolution_plans', resolution_plans)
routes.get('/auction_notices', auction_notices)
routes.get('/orders', orders)
routes.get('/summary_of_outcomes', summary_of_outcomes)
routes.get('/supreme_court', supreme_court)
routes.get('/high_court', high_court)
routes.get('/nclat', nclat)
routes.get('/nclt', nclt)
routes.get('/drat', drat)
routes.get('/drts', drts)
routes.get('/ibbi', ibbi)
routes.get('/ipa_rvo', ipa_rvo)
routes.get('/other_courts', other_courts)